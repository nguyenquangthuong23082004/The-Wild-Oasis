import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CarbinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

import { useState } from "react";
function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tất cả carbins</Heading>
        <p>Bộ lọc / Sắp xếp</p>
      </Row>

      <Row type="vertical">
        <CarbinTable />
        <Button onClick={() => setShowForm((prev) => !prev)}>
          Thêm mới carbin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
