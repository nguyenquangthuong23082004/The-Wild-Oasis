import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ carbin }) {
  const {
    id: carbinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = carbin;

  const { isDeletingCarbin, deleteCabin } = useDeleteCabin();
  const { isCreating, creatCabin } = useCreateCabin();

  function handleDuplicate() {
    creatCabin({
      name: `Nhân bản cabin ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }
  return (
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Phù hợp với tối đa {maxCapacity} khách</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={carbinId} />
            <Menus.List id={carbinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Nhân bản
              </Menus.Button>

              <Modal.Open opens={"cabin-edit-form"}>
                <Menus.Button icon={<HiPencil />}>Sửa</Menus.Button>
              </Modal.Open>

              <Modal.Open opens={"cabin-delete-form"}>
                <Menus.Button icon={<HiTrash />}>Xóa</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          <Modal.Window name={"cabin-edit-form"}>
            <CreateCabinForm cabinToEdit={carbin} />
          </Modal.Window>

          <Modal.Window name={"cabin-delete-form"}>
            <ConfirmDelete
              resourceName={"cabins"}
              disabled={isDeletingCarbin}
              onConfirm={() => deleteCabin(carbinId)}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
