import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

export async function signUp(email: string, password: string, fullName: string, university: string) {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: fullName,
            university,
          },
        ]);

      if (profileError) throw profileError;

      toast.success('Registration successful! Please check your email to verify your account.');
      return { user: authData.user, error: null };
    }
  } catch (error) {
    console.error('Error during sign up:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to sign up');
    return { user: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    toast.success('Successfully signed in!');
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error during sign in:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    return { user: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.success('Successfully signed out!');
  } catch (error) {
    console.error('Error during sign out:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to sign out');
  }
}