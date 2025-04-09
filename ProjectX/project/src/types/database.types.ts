export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  category: string;
  seller_id: string;
  created_at: string;
  image_url?: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  university: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  book_id: string;
  quantity: number;
  created_at: string;
  book: Book;
}