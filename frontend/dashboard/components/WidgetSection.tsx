import KPIWidget from '@/components/KPIWidget';
import { ReactNode } from 'react';

interface WidgetSectionProps {
  children: ReactNode;
}

const WidgetSection = ({ children }: WidgetSectionProps) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
      {children}
    </section>
  );
};

export default WidgetSection;
