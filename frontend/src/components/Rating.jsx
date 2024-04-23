import { Rating } from "@mantine/core";

// eslint-disable-next-line react/prop-types
function RatingComponent({ value , readOnly = true,size ="md" , onChange = () => null} ) {
  return <Rating value={value} fractions={2} readOnly={readOnly} onChange={onChange} size={size} />;
}

export default RatingComponent