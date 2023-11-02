type Props = {
  children: React.ReactNode;
};

const GridContainer = ({ children }: Props) => {
  return <div className={`grid grid-cols-5`}>{children}</div>;
};

export default GridContainer;
