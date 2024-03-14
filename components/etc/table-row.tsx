interface TableRowsProps {
  rows: string[][];
}

export const TableRows = ({ rows }: TableRowsProps) => {
  return (
    <>
      <div className="grid grid-cols-5 w-full bg-gray-200 min-w-[500px]">
        <span className="col-span-1 text-center w-full py-4 px-2 md:px-4 text-sm md:text-base font-medium">
          Month
        </span>
        <span className="col-span-1 text-center w-full py-4 px-2 md:px-4 text-sm md:text-base font-medium">
          Principle
        </span>
        <span className="col-span-1 text-center w-full py-4 px-2 md:px-4 text-sm md:text-base font-medium">
          Interest
        </span>
        <span className="col-span-1 text-center w-full py-4 px-2 md:px-4 text-sm md:text-base font-medium">
          EMI
        </span>
        <span className="col-span-1 text-center w-full py-4 px-2 md:px-4 text-sm md:text-base font-medium">
          Balance
        </span>
      </div>
      {rows &&
        rows.map((r, index) => (
          <div
            className="grid grid-cols-5 w-full bg-gray-200 min-w-[500px]"
            key={index}
          >
            {r.map((r, index) => (
              <span
                key={index}
                className="col-span-1 text-center w-full py-4 px-2 md:px-4 text-sm md:text-base font-medium"
              >
                {r}
              </span>
            ))}
          </div>
        ))}
    </>
  );
};
