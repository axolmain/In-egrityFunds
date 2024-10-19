const WidgetSection = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
      <div className='bg-white dark:bg-gray-700 rounded-lg shadow p-6'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
          Total Revenue
        </h2>
        <p className='text-xl font-bold text-gray-800 dark:text-gray-200'>
          $150,000
        </p>
      </div>
      <div className='bg-white dark:bg-gray-700 rounded-lg shadow p-6'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
          Total Expenses
        </h2>
        <p className='text-xl font-bold text-gray-800 dark:text-gray-200'>
          $90,000
        </p>
      </div>
      <div className='bg-white dark:bg-gray-700 rounded-lg shadow p-6'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
          Net Profit
        </h2>
        <p className='text-xl font-bold text-gray-800 dark:text-gray-200'>
          $60,000
        </p>
      </div>
    </section>
  );
};

export default WidgetSection;
