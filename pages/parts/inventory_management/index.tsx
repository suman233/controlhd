import { getInventory, getPartsMatrix } from "@/api/functions/parts.api";
import DataGridTable from "@/components/Table/DataGridTable";
import { Inventory } from "@/interface/stoysec.interface";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import {
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  styled
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDebounce } from "@/hooks/utils/useDebounce";
import { AddCircleRounded } from "@mui/icons-material";
import CustomInput from "@/ui/Inputs/CustomInput";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";

export interface menuButtonType {
  title1?: string;
  title2?: string;
  handleClick1?: any;
  handleClick2?: any;
}

const InventoryPage = () => {
  const StyledContainer = styled("section")`
    margin: 10px;
  `;
  const { isLoading, data, error } = useQuery({
    queryKey: ["inventorylist"],
    queryFn: getInventory
  });
  console.log("data", data);

  const [opened, setOpened] = useState(false);
  const handleClickOpen = () => {
    setOpened(true);
  };

  // const rows= data?.map((item: Inventory[], idx)=>{
  //     return item['idx']===undefined ? "" : item
  // })
  const ITEM_HEIGHT = 28;
  const MenuButton = ({
    title1,
    title2,
    handleClick1,
    handleClick2
  }: menuButtonType) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
      setAnchorEl(null);
    }, []);

    return (
      <>
        <IconButton onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
              borderRadius: "15px"
            }
          }}
          elevation={3}
        >
          <MenuItem
            onClick={() => {
              handleClick1();
              handleClose();
            }}
          >
            <EditIcon fontSize="small" sx={{ color: "blue", mr: 1 }} />
            <Typography color="blue">{title1}</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClick2();
              handleClose();
            }}
          >
            <DeleteIcon fontSize="small" sx={{ color: "red", mr: 1 }} />
            <Typography color="red">{title2}</Typography>
          </MenuItem>
        </Menu>
      </>
    );
  };

  const [searchItem, setSearchItem] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchItem(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchItem(e.target.value);
  };
  const debouncedSearch = useDebounce(searchItem, 1000);
  console.log("result", debouncedSearch);

  const filteredData = data?.filter((item) => {
    const searchItemLower = debouncedSearch?.toLowerCase();
    const descriptionLower = item.description.toLowerCase();

    return descriptionLower.includes(searchItemLower);
  });

  const [showModal, setShowModal] = useState(false);
  const { data: partmatrix} = useQuery({
    queryKey: ["matrixlist"],
    queryFn: getPartsMatrix
  });
  console.log("mtdata", partmatrix);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120, sortable: true },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true
    },
    {
      field: "part_no",
      headerName: "Part Number",
      width: 150,
      editable: true
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 140,
      editable: true
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <MenuButton
          title1="Edit"
          title2="Delete"
          handleClick1={handleClickOpen}
        />
      )
    }
  ];

  const title=partmatrix?.filter(item=>item.part_no)
  return (
    <DashboardLayout>
      <Container maxWidth={"xl"}>
        <form style={{ float: "left" }} onSubmit={handleSubmit}>
          <CustomInput
            sx={{ background: "white" }}
            placeholder="Search Something"
            name="searchInput"
            value={searchItem}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ m: 0.5, p: 1.5 }}
            type="submit"
          >
            Search
          </Button>
        </form>
        <Button
          variant="contained"
          color="success"
          sx={{ m: 0.5, p: 1.5, float: "right" }}
          onClick={() => setShowModal(true)}
        >
          <AddCircleRounded /> Create
        </Button>
      </Container>
      <StyledContainer>
        <DataGridTable
          columns={columns}
          rows={(filteredData as Inventory[]) ?? ""}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8
              }
            }
          }}
          pageSizeOptions={[13, 25]}
        />
      </StyledContainer>
      {/* <MuiModalWrapper open={showModal} onClose={setShowModal as () => void}  /> */}
    </DashboardLayout>
  );
};

export default InventoryPage;
