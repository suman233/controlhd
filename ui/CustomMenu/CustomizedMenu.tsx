import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";
import MuiModalWrapper from "../Modal/MuiModalWrapper";
import { deleteMatrix } from "@/api/functions/parts.api";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "2px 0"
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}));

interface MyComponentProps {
  id: number;
}

const CustomizedMenu: React.FC<MyComponentProps> = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClose = () => {
    setOpen((prev) => !prev);
  };

  const handleDelete = () => {
    setOpen((prev) => !prev);
    setAnchorEl(null);
  };

  const { mutate } = useMutation({
    mutationKey: ["deletepartm", id],
    mutationFn: () => deleteMatrix(id)
  });

  const deleteMatrixHandler = () => {
    console.log("deleteid", id);
    mutate(id, {
      onSuccess: (res) => {
        console.log(res, "from data");
        if (res.code === 200) {
          toast.success(res.message);
          setOpen((prev) => !prev);
          queryClient.invalidateQueries({ queryKey: ["matrixlist"] });
        }
      },
      onError: (e) => {
        toast.error("not Deleted");
      }
    });
  };

  const editPartsMatrixHandler = () => {
    router.push({
      pathname: `${router.pathname}/edit`,
      query: { id: id }
    });
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={openMenu ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        disableElevation
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ cursor: "pointer" }} />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button"
        }}
        anchorEl={anchorEl}
        open={openMenu}
        // onClose={handleClose}
      >
        <MenuItem onClick={editPartsMatrixHandler} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
      {open && (
        <MuiModalWrapper
          title="Are you sure to delete this matrix?"
          onClose={onClose}
          open={open}
          sx={{p:2, m:2}}
        >
          <Stack direction="row" spacing={2} style={{ width: "100%" }}>
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              style={{
                width: "50%",
                background: "#ff5e4b",
                borderRadius: "20px"
              }}
              onClick={onClose}
            >
              No
            </Button>
            <Button
              startIcon={<CheckIcon />}
              variant="contained"
              style={{
                width: "50%",
                background: "#00a15d",
                borderRadius: "20px"
              }}
              onClick={deleteMatrixHandler}
            >
              Yes
            </Button>
          </Stack>
        </MuiModalWrapper>
      )}
    </div>
  );
};

export default CustomizedMenu;
