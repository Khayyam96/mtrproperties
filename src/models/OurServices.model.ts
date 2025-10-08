export type IconKey = 'users' | 'check' | 'award' | 'list';

export type ServiceItem = {
  id: number;
  icon: IconKey;         
  title: string;
  description: string;
};

export type OurServicesResponse = {
  data: ServiceItem[];
  total: number;
  page: number;
  per_page: number;
};
