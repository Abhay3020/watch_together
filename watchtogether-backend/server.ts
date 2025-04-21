import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Root
app.get('/', (_req, res) => {
  res.send('✅ WatchTogether backend is live!');
});

// ------------------ Watchlist Groups ------------------ //

// Get all groups
app.get('/watchlist-groups', async (_req, res) => {
  const { data, error } = await supabase
    .from('watchlist_groups')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Create a new group
app.post('/watchlist-groups', async (req, res) => {
  const { name, type } = req.body;
  const { data, error } = await supabase
    .from('watchlist_groups')
    .insert([{ name, type }])
    .select();

  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

// Rename a group
app.patch('/watchlist-groups/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { data, error } = await supabase
    .from('watchlist_groups')
    .update({ name })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// Delete a group
app.delete('/watchlist-groups/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('watchlist_groups')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

// ------------------ Watchlist Items ------------------ //

// Get items under a group
app.get('/watchlist-items/:group_id', async (req, res) => {
  const { group_id } = req.params;
  const { data, error } = await supabase
    .from('watchlist_items')
    .select('*')
    .eq('group_id', group_id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Add an item
app.post('/watchlist-items', async (req, res) => {
  const { group_id, title, name, overview, poster_path } = req.body;
  const { data, error } = await supabase
    .from('watchlist_items')
    .insert([{ group_id, title, name, overview, poster_path }])
    .select();

  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
});

// Delete an item
app.delete('/watchlist-items/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('watchlist_items')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error });
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('🚀 Backend running on http://localhost:3001');
});
