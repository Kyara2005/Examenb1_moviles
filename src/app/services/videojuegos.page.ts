import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {SupabaseService} from './supabase.service';

export interface Encuesta {
  nombre: string;
  edad: string;
  rol: string;
  videojuego: string;
  plataforma: string;
  genero: string;
  comentario: string;
  latitud: number;
  longitud: number;
  fecha: string;
  hora: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideojuegosService {

  private supabase: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabaseDB;
  }

  async listar() {
    const { data, error } = await this.supabase
      .from('encuestas')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data as Encuesta[];
  }

  async obtenerPorId(id: number) {
    const { data, error } = await this.supabase
      .from('encuestas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Encuesta;
  }

  async crear(encuesta: Encuesta) {
    const { data, error } = await this.supabase
      .from('encuestas')
      .insert(encuesta)
      .select();

    if (error) throw error;
    return data;
  }

  async actualizar(id: number, encuesta: Encuesta) {
    const { data, error } = await this.supabase
      .from('encuestas')
      .update(encuesta)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async eliminar(id: number) {
    const { error } = await this.supabase
      .from('encuestas')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async subirImagen(file: File): Promise<string> {

    const nombreArchivo = `${Date.now()}_${file.name}`;

    const { error } = await this.supabase.storage
      .from('imagenes')
      .upload(nombreArchivo, file);

    if (error) throw error;

    const { data } = this.supabase.storage
      .from('imagenes')
      .getPublicUrl(nombreArchivo);

    return data.publicUrl;
  }


  // SUBIR AUDIO
  async subirAudio(file: File): Promise<string> {

    const nombreArchivo =
      `${Date.now()}_${file.name}`;

    const { error } = await this.supabase.storage
      .from('audios')
      .upload(nombreArchivo, file);

    if (error) throw error;

    const { data } = this.supabase.storage
      .from('audios')
      .getPublicUrl(nombreArchivo);

    return data.publicUrl;
  }

  async crearEncuesta(encuesta: Encuesta) {
    const { data, error } = await this.supabase
      .from('encuestas')
      .insert(encuesta)
      .select();

    if (error) throw error;
    return data;
  }
}