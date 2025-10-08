export type ContactSettingsResponse = {
  id: number;
  lat: string;      
  long: string;       
  address: string;    
  phone: string;      
  whatsapp: string;   
  email: string;      
  facebook_url?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  tiktok_url?: string | null;
};
