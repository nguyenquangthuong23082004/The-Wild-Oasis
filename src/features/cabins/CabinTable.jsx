import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, carbins } = useCabin();

  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Ảnh</div>
        <div>Tên Phòng</div>
        <div>Sức chứa</div>
        <div>Giá phòng</div>
        <div>Khuyến mãi</div>
        <div>Thao tác</div>
      </Table.Header>

      <Table.Body
        data={carbins}
        render={(carbin) => (
          <CabinRow key={carbin.id} carbin={carbin} />
        )}
      />
    </Table>
  );
}

export default CabinTable;
