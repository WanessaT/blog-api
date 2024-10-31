

import dotenv from 'dotenv';
dotenv.config(); // Vai carregar as variáveis do .env

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Criar um novo post
export const createPost = async (request, response) => {
    try {
        const { title, body, userId } = request.body;
        const { error } = await supabase
            .from('posts')
            .insert([{ title, body, userId }]);

        if (error) throw error;
        response.status(201).json({ message: 'Post criado com sucesso!' });

    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Falha na criação do post' });

    }
};

// Listar todos os posts
export const getAllPosts = async (request, response) => {
    const { data, error } = await supabase
        .from('posts')
        .select('*');

    if (error) {
        return response.status(500).json({ error: error.message });
    }
    response.json(data);
};

// Listar post por ID
export const getPostById = async (request, response) => {
    const postId = parseInt(request.params.id);
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

    if (error) {
        return response.status(500).json({ error: error.message });
    }
    response.json(data);
};

// Atualizar um post existente no sistema 
export const updatePost = async (request, response) => {
    try {
        const postId = parseInt(request.params.id);
        const { title, body, userId } = request.body;
        const { error } = await supabase
            .from('posts')
            .update({ title, body, userId })
            .eq('id', postId);

        if (error) throw error
        response.status(200).json({ message: 'Post alterado com sucesso!'});

    } catch (error) {
        response.status(500).json({ error: 'Falha na criação do post' });

    }
};

// Deletar um post
export const deletePost = async (request, response) => {
    const postId = parseInt(request.params.id);
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

    if (error) {
        return response.status(500).json({ error: error.message });
    }
    response.status(204).send(); // status 204 indica sucesso sem conteúdo de resposta
};
