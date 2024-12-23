import { Tables } from './tables';

export type Database = {
  public: {
    Tables: Tables;
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};