import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    // Para la base de datos
    public supabaseDB: SupabaseClient = createClient(
        environment.supabaseUrl,
        environment.supabaseKey,
        {
            auth: {
                storageKey: 'supabase-db-client',
                // persistSession: false, // no guarda sesión, no necesita lock
                // autoRefreshToken: false // no refresca token, no necesita lock
            }
        }
    );
}
