import { Loader } from '@mantine/core';

const LoaderComponent = () => {
  return (
    <Loader
      size="xl"
      type="oval"
      style={{
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default LoaderComponent;
