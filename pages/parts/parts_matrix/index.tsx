import { getPartsMatrix } from "@/api/functions/parts.api";
import DataGridTable from "@/components/Table/DataGridTable";
import { PTM } from "@/interface/matrix.interface";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { menuButtonType } from "../inventory_management";
import CustomInput from "@/ui/Inputs/CustomInput";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import Loader from "@/ui/Loader/Loder";
import { useRouter } from "next/router";
import CustomizedMenu from "@/ui/CustomMenu/CustomizedMenu";

const PartsMatrix = () => {
  const StyledContainer = styled("section")`
    margin: 20px;
  `;
  const { isLoading, data, error } = useQuery({
    queryKey: ["matrixlist"],
    queryFn: getPartsMatrix,
    refetchOnMount: true
  });
  console.log("mtdata", data);

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

  const [opened, setOpened] = useState(false);
  const handleClickOpen = () => {
    setOpened(true);
  };

  const columns: GridColDef[] = [
    {
      field: "part_no",
      headerName: "Part No",
      width: 120,
      headerClassName: "col-theme--header",
      renderCell: (params) => `#${params.row.part_no}`
    },
    {
      field: "description",
      headerName: "Description",
      width: 240,
      editable: true,
      headerClassName: "col-theme--header"
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer Name",
      width: 200,
      editable: true,
      headerClassName: "col-theme--header"
    },
    {
      field: "price",
      headerName: "Price ($)",
      type: "number",
      width: 140,
      headerClassName: "col-theme--header",
      renderCell: (params) => `$ ${params.row.price.toFixed(2)}`
    },
    {
      field: "part_type",
      headerName: "Part Type",
      width: 180,
      align: "center",
      headerAlign: "center",
      headerClassName: "col-theme--header"
    },
    {
      field: "doc",
      headerName: "Doc File",
      width: 180,
      editable: true,
      align: "center",
      headerAlign: "center",
      headerClassName: "col-theme--header",
      renderCell: (params) => (
        <Link href={`${params.row.document_full_path}`}>
          <PictureAsPdfIcon />
        </Link>
      )
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      editable: true,
      headerClassName: "col-theme--header",
      align: "center",
      renderCell: (params) => <CustomizedMenu id={Number(params.id)} />
    }
  ];

  const [partID, setPartID] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = (e: any) => {
    // const results = encodeURIComponent(searchItem)
    setSearchInput(e.target.value);
  };
  const [filteredResults, setFilteredResults] = useState([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchInput(e.target.value);
  };

  const filteredData = data?.filter((item) => {
    const searchItemLower = searchInput?.toLowerCase();
    const descriptionLower = item.description.toLowerCase();
    const manufacturerLower = item.manufacturer.toLowerCase();

    return (
      descriptionLower.includes(searchItemLower) ||
      manufacturerLower.includes(searchItemLower)
    );
  });
  const router = useRouter();

  const handleCreate = () => {};

  // const handleSearch = (searchValue: string) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== "") {
  //     let filteredData = data?.filter((item) => {
  //       return Object.values(item)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchInput.toLowerCase());
  //     });
  //     console.log(filteredData, "filteredData");
  //     // setFilteredResults(filteredData);
  //   } else {
  //     // setFilteredResults(data);
  //   }
  // };

  return (
    <DashboardLayout>
      <Container sx={{ maxWidth: "xl" }}>
        <form style={{ float: "left" }} onSubmit={handleSubmit}>
          <CustomInput
            sx={{ background: "white" }}
            placeholder="Search Something"
            name="searchInput"
            value={searchInput}
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
          onClick={() => router.push("/parts/parts_matrix/create")}
        >
          <AddIcon sx={{ fontSize: "20px" }} /> Create
        </Button>
      </Container>
      <StyledContainer>
        <DataGridTable
          columns={columns}
          rows={
            (filteredData as PTM[]) ?? (
              <Skeleton
                variant="circular"
                sx={{
                  backgroundColor: "green",
                  color: "green",
                  my: 4,
                  mx: 1
                }}
              />
            )
          }
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8
              }
            }
          }}
          pageSizeOptions={[13, 25]}
          loading={isLoading ?? <CircularProgress size={300} />}
        />
      </StyledContainer>
    </DashboardLayout>
  );
};

export default PartsMatrix;
