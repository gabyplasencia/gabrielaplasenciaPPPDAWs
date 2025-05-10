<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    // Crear un ticket (usuario)
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:1000',
        ]);

        $ticket = Ticket::create([
            'user_id'     => Auth::id(),
            'description' => $request->description,
            'status'      => 'open',
        ]);

        return response()->json(['message' => 'Ticket creado', 'ticket' => $ticket], 201);
    }

    // Listar todos los tickets (admin)
    public function index()
    {
        $adminId = Auth::id();

        $tickets = Ticket::with('user')->get()->map(function ($ticket) use ($adminId) {
            if ($ticket->status === 'ready' && $ticket->taken_by !== $adminId) {
                $ticket->status = 'taken'; // camuflar ready para otros admins
            }
            return $ticket;
        });

        return response()->json($tickets);
    }

    // Cambiar estado (admin)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:open,taken,ready,complete',
        ]);

        $ticket = Ticket::findOrFail($id);
        $adminId = Auth::id();

        switch ($request->status) {
            case 'taken':
                if ($ticket->status !== 'open') {
                    return response()->json(['error' => 'Ticket is not open'], 403);
                }
                $ticket->status = 'taken';
                $ticket->taken_by = $adminId;
                break;

            case 'ready':
                if ($ticket->status !== 'taken' || $ticket->taken_by !== $adminId) {
                    return response()->json(['error' => 'Only the assigned admin can mark as ready'], 403);
                }
                $ticket->status = 'ready';
                break;

            case 'complete':
                if ($ticket->status !== 'ready' || $ticket->taken_by !== $adminId) {
                    return response()->json(['error' => 'Only the assigned admin can complete the ticket'], 403);
                }
                $ticket->status = 'complete';
                break;

            default:
                return response()->json(['error' => 'Invalid status change'], 400);
        }

        $ticket->save();

        return response()->json(['message' => 'Estado actualizado', 'ticket' => $ticket]);
    }
}

