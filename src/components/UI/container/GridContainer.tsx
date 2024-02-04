type Props = {
  children: React.ReactNode;
  isReponsive?: boolean;
};

const responsiveGridStyle = () => {
  return `lg:grid-cols-4 lg:gap-7 md:grid-cols-3 md:gap-5 grid-cols-2 gap-4 `;
};

const GridContainer = ({ children, isReponsive = true }: Props) => {
  return (
    <div
      className={`w-full grid ${
        isReponsive ? responsiveGridStyle() : "grid-cols-2 sm:grid-cols-3 gap-4"
      } }`}
    >
      {children}
    </div>
  );
};

export default GridContainer;
