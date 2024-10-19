import React, { FC } from 'react';

interface KPIWidgetProps {
  title: string;
  value: number | string;
  unit?: string;
}

const KPIWidget: FC<KPIWidgetProps> = ({ title, value, unit = '$' }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <div className='text-2xl font-bold'>
        {unit}
        {value}
      </div>
    </div>
  );
};

export default KPIWidget;
