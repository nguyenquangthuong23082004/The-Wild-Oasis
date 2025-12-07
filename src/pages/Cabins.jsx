import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CarbinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tất cả carbins</Heading>
        <p>Bộ lọc / Sắp xếp</p>
      </Row>

      <Row type="vertical">
        <CarbinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
