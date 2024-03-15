import { editMatrix, getSingleMatrix } from "@/api/functions/parts.api";
import { PartsMatrixType } from "@/interface/createpart.interface";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import formStyle from "@/styles/pages/form.module.scss";
import CustomInput from "@/ui/Inputs/CustomInput";
import Loader from "@/ui/Loader/Loder";
import { yupResolver } from "@hookform/resolvers/yup";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const digitsOnly = (value: any) => /^\d+$/.test(value);

const schema = yup
  .object({
    part_no: yup.string().required("Part number is required"),
    description: yup.string().required("Description is required"),
    manufacturer: yup.string().required("Manufacturer is required"),
    price: yup
      .number()
      .required("Price is required")
      .test("Digits only", "Only Number", digitsOnly),
    part_type: yup.string().required("Part Type is required"),
    damper: yup.boolean(),
    valve: yup.boolean(),
    commissioning_actions: yup
      .string()
      .required("Commision Action is required"),
    engineering_actions: yup
      .string()
      .required("Engineering Action is required"),
    controller_ao: yup.string().when("partType", {
      is: "controller",
      then: (schema) => schema.required("AO number is required"),
      otherwise: (schema) => schema
    }),
    controller_ai: yup.string().when("partType", {
      is: "controller",
      then: (schema) => schema.required("AI number is required"),
      otherwise: (schema) => schema
    }),
    controller_di: yup.string().when("partType", {
      is: "controller",
      then: (schema) => schema.required("DI number is required"),
      otherwise: (schema) => schema
    }),
    controller_do: yup.string().when("partType", {
      is: "controller",
      then: (schema) => schema.required("DO number is required"),
      otherwise: (schema) => schema
    }),
    damper_length: yup.string().when("isDamper", {
      is: true,
      then: (schema) => schema.required("Damper Length is required"),
      otherwise: (schema) => schema
    }),
    damper_width: yup.string().when("isDamper", {
      is: true,
      then: (schema) => schema.required("Damper Width is required"),
      otherwise: (schema) => schema
    }),
    torque: yup.string().when("isDamper", {
      is: true,
      then: (schema) => schema.required("Torque is required"),
      otherwise: (schema) => schema
    }),
    signal_type: yup.string().when("isDamper", {
      is: true,
      then: (schema) => schema.required("Signal Type is required"),
      otherwise: (schema) => schema
    }),
    dumper_valve_type: yup.string().when("isDamper", {
      is: true,
      then: (schema) => schema.required("Type is required"),
      otherwise: (schema) => schema
    }),
    valve_cv: yup.string().when("isValve", {
      is: true,
      then: (schema) => schema.required("Valve CV is required"),
      otherwise: (schema) => schema
    }),
    valve_pipe_diameter_inch: yup.string().when("isValve", {
      is: true,
      then: (schema) => schema.required("Valve Pipe Diameter is required"),
      otherwise: (schema) => schema
    }),
    valve_type: yup.string().when("isValve", {
      is: true,
      then: (schema) => schema.required("Valve Type is required"),
      otherwise: (schema) => schema
    }),
    valve_body_style: yup.string().when("isValve", {
      is: true,
      then: (schema) => schema.required("Valve Body Style is required"),
      otherwise: (schema) => schema
    }),
    document: yup.mixed()
  })
  .required();

const editPartsMatrix = () => {
  const router = useRouter();
  const partsMatrixId = router.query.id;

  const {
    register,
    handleSubmit,
    unregister,
    watch,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<PartsMatrixType>({
    resolver: yupResolver(schema)
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getSingleParts", partsMatrixId],
    queryFn: () => getSingleMatrix(partsMatrixId),
    enabled: partsMatrixId !== undefined
  });

  const { mutate } = useMutation({
    mutationFn: editMatrix
  });

  useEffect(() => {
    if (data) {
      for (let i in data) {
        if (data[i] === null) {
          data[i] = "null";
        }
      }
      reset(data);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  //   if (error) return "An error has occurred: ";

  const watchPartTypeCheck = watch("part_type");

  const watchDamperCheck = watch("damper");

  const watchValveCheck = watch("valve");

  type UpdateMatrix = {
    id: string;
    body: FormData;
  };

  console.log(errors);

  const onSubmit: SubmitHandler<PartsMatrixType> = async (data) => {
    let body = new FormData();
    if (data.document.length === 0) {
      //   if (data.document[0] !== null) {

      console.log(data);

      body.append("part_no", data.part_no);
      body.append("description", data.description);
      body.append("manufacturer", data.manufacturer);
      body.append("price", data.price?.toString());
      body.append("part_type", data.part_type);
      body.append("commissioning_actions", data.commissioning_actions);
      body.append("engineering_actions", data.engineering_actions);
      body.append("controller_ao", data.controller_ao);
      body.append(
        "controller_ai",
        data.controller_ai ? data.controller_ai.toString() : ""
      );
      body.append(
        "controller_di",
        data.controller_di ? data.controller_di.toString() : ""
      );
      body.append(
        "controller_do",
        data.controller_do ? data.controller_do.toString() : ""
      );
      body.append("damper", data.damper ? "1" : "0");
      body.append("valve", data.valve ? "1" : "0");
      body.append(
        "damper_length",
        data.damper_length ? data.damper_length : ""
      );
      body.append("damper_width", data.damper_width ? data.damper_width : "");
      body.append("torque", data.torque ? data.torque : "");
      body.append("signal_type", data.signal_type ? data.signal_type : "");
      body.append(
        "dumper_valve_type",
        data.dumper_valve_type ? data.dumper_valve_type : ""
      );
      body.append("valve_cv", data.valve_cv ? data.valve_cv : "");
      body.append(
        "valve_pipe_diameter_inch",
        data.valve_pipe_diameter_inch ? data.valve_pipe_diameter_inch : ""
      );
      body.append("valve_type", data.valve_type ? data.valve_type : "");
      body.append(
        "valve_body_style",
        data.valve_body_style ? data.valve_body_style : ""
      );

      mutate(body, {
        onSuccess: (res) => {},
        onError: (e) => {}
      });
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              variant="h4"
              align="center"
            >
              Edit Part Matrix
            </Typography>
            <Grid
              container
              mt={4}
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Box className={formStyle.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid mt={1}>
                    <FormLabel>
                      Part Number <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <CustomInput
                      placeholder="Part Number"
                      style={{ width: "100%" }}
                      {...register("part_no")}
                    />
                    {errors.part_no ? (
                      <span className={formStyle.error}>
                        {errors.part_no?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid mt={1}>
                    <FormLabel>
                      Description <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <CustomInput
                      placeholder="Description"
                      style={{ width: "100%" }}
                      {...register("description")}
                    />
                    {errors.description ? (
                      <span className={formStyle.error}>
                        {errors.description?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid mt={1}>
                    <FormLabel>
                      Manufacturer Name{" "}
                      <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <CustomInput
                      placeholder="Manufacturer Name"
                      style={{ width: "100%" }}
                      {...register("manufacturer")}
                    />
                    {errors.manufacturer ? (
                      <span className={formStyle.error}>
                        {errors.manufacturer?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid mt={1}>
                    <FormLabel>
                      Price($) <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <CustomInput
                      placeholder="Price"
                      type="number"
                      // defaultValue={0}
                      style={{ width: "100%" }}
                      {...register("price")}
                    />
                    {errors.price ? (
                      <span className={formStyle.error}>
                        {errors.price?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid mt={1}>
                    <FormLabel>
                      Part Type <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <Controller
                      control={control}
                      name="part_type"
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          style={{ width: "100%" }}
                          {...register("part_type")}
                        >
                          <MenuItem value="">Select Part Type</MenuItem>
                          <MenuItem value="input">Input</MenuItem>
                          <MenuItem value="output">Output</MenuItem>
                          <MenuItem value="controller">Controller</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.part_type ? (
                      <span className={formStyle.error}>
                        {errors.part_type?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>

                  {/* if part type is input or output start */}
                  {watchPartTypeCheck === "input" ||
                  watchPartTypeCheck === "output" ? (
                    <>
                      <div className="flex justify-between">
                        <Controller
                          name="damper"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={value}
                                  {...register("damper")}
                                  defaultChecked={false}
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#00a15d"
                                    }
                                  }}
                                />
                              }
                              label="Is Damper"
                            />
                          )}
                        />
                      </div>
                      {/* if isDamper is true start */}
                      {watchDamperCheck ? (
                        <>
                          <Grid mt={1}>
                            <FormLabel>
                              Damper Length{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Damper Length"
                              style={{ width: "100%" }}
                              {...register("damper_length")}
                            />
                            {errors.damper_length ? (
                              <span className={formStyle.error}>
                                {errors.damper_length?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid mt={1}>
                            <FormLabel>
                              Damper Width{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Damper Width"
                              style={{ width: "100%" }}
                              {...register("damper_width")}
                            />
                            {errors.damper_width ? (
                              <span className={formStyle.error}>
                                {errors.damper_width?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </>
                      ) : null}
                      {/* if isDamper is true end */}

                      {/* is valve start */}
                      <div className="flex justify-between">
                        <Controller
                          name="valve"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={value}
                                  defaultChecked={false}
                                  {...register("valve")}
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#00a15d"
                                    }
                                  }}
                                />
                              }
                              label="Is Valve"
                            />
                          )}
                        />
                      </div>

                      {/* if isValve is true start */}

                      {watchValveCheck ? (
                        <>
                          <Grid mt={1}>
                            <FormLabel>
                              Valve Cv{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Valve Cv"
                              style={{ width: "100%" }}
                              {...register("valve_cv")}
                            />
                            {errors.valve_cv ? (
                              <span className={formStyle.error}>
                                {errors.valve_cv?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid mt={1}>
                            <FormLabel>
                              Valve Pipe Diameter{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Valve Pipe Diameter"
                              style={{ width: "100%" }}
                              {...register("valve_pipe_diameter_inch")}
                            />
                            {errors.valve_pipe_diameter_inch ? (
                              <span className={formStyle.error}>
                                {errors.valve_pipe_diameter_inch?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid mt={1}>
                            <FormLabel>
                              Valve Type{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Valve Type"
                              style={{ width: "100%" }}
                              {...register("valve_type")}
                            />
                            {errors.valve_type ? (
                              <span className={formStyle.error}>
                                {errors.valve_type?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid mt={1}>
                            <FormLabel>
                              Valve Body Style{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Valve Body Style"
                              style={{ width: "100%" }}
                              {...register("valve_body_style")}
                            />
                            {errors.valve_body_style ? (
                              <span className={formStyle.error}>
                                {errors.valve_body_style?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </>
                      ) : null}
                      {/* if isValve is true end */}
                      {/* is valve end */}

                      {/* if isDamper is true start */}
                      {watchDamperCheck ? (
                        <>
                          <Grid mt={1}>
                            <FormLabel>
                              Torque <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <CustomInput
                              placeholder="Torque"
                              style={{ width: "100%" }}
                              {...register("torque")}
                            />
                            {errors.torque ? (
                              <span className={formStyle.error}>
                                {errors.torque?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid mt={1}>
                            <FormLabel>
                              Signal Type{" "}
                              <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <Controller
                              control={control}
                              name="signal_type"
                              defaultValue=""
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  style={{ width: "100%" }}
                                  {...register("signal_type")}
                                >
                                  <MenuItem value="">
                                    Select Signal Type
                                  </MenuItem>
                                  <MenuItem value="type1">Type1</MenuItem>
                                  <MenuItem value="type2">Type2</MenuItem>
                                </Select>
                              )}
                            />
                            {errors.signal_type ? (
                              <span className={formStyle.error}>
                                {errors.signal_type?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                          <Grid mt={1}>
                            <FormLabel>
                              Type <span className={formStyle.error}>*</span>
                            </FormLabel>
                            <Controller
                              control={control}
                              name="dumper_valve_type"
                              defaultValue=""
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  style={{ width: "100%" }}
                                  {...register("dumper_valve_type")}
                                >
                                  <MenuItem value="">Select Type</MenuItem>
                                  <MenuItem value="option1">Option1</MenuItem>
                                  <MenuItem value="option2">Option2</MenuItem>
                                </Select>
                              )}
                            />
                            {errors.dumper_valve_type ? (
                              <span className={formStyle.error}>
                                {errors.dumper_valve_type?.message}
                              </span>
                            ) : (
                              ""
                            )}
                          </Grid>
                        </>
                      ) : null}
                      {/* if isDamper is true end */}
                    </>
                  ) : null}
                  {/* if part type is input or output end */}

                  {/* if part type is controller start */}
                  {watchPartTypeCheck === "controller" ? (
                    <>
                      <Grid mt={1}>
                        <FormLabel>
                          AO Number <span className={formStyle.error}>*</span>
                        </FormLabel>
                        <CustomInput
                          placeholder="AO Number"
                          defaultValue={0}
                          style={{ width: "100%" }}
                          {...register("controller_ao")}
                        />
                        {errors.controller_ao ? (
                          <span className={formStyle.error}>
                            {errors.controller_ao?.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid mt={1}>
                        <FormLabel>
                          AI Number <span className={formStyle.error}>*</span>
                        </FormLabel>
                        <CustomInput
                          placeholder="AI Number"
                          defaultValue={0}
                          style={{ width: "100%" }}
                          {...register("controller_ai")}
                        />
                        {errors.controller_ai ? (
                          <span className={formStyle.error}>
                            {errors.controller_ai?.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid mt={1}>
                        <FormLabel>
                          DI Number <span className={formStyle.error}>*</span>
                        </FormLabel>
                        <CustomInput
                          placeholder="DI Number"
                          defaultValue={0}
                          style={{ width: "100%" }}
                          {...register("controller_di")}
                        />
                        {errors.controller_di ? (
                          <span className={formStyle.error}>
                            {errors.controller_di?.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid mt={1}>
                        <FormLabel>
                          DO Number <span className={formStyle.error}>*</span>
                        </FormLabel>
                        <CustomInput
                          placeholder="DO Number"
                          defaultValue={0}
                          style={{ width: "100%" }}
                          {...register("controller_do")}
                        />
                        {errors.controller_do ? (
                          <span className={formStyle.error}>
                            {errors.controller_do?.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </>
                  ) : null}
                  {/* if part type is controller end */}

                  <Grid mt={1}>
                    <FormLabel>
                      Commissioning Actions{" "}
                      <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <CustomInput
                      multiline
                      rows={3}
                      style={{ width: "100%" }}
                      {...register("commissioning_actions")}
                    />
                    {errors.commissioning_actions ? (
                      <span className={formStyle.error}>
                        {errors.commissioning_actions?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid mt={1}>
                    <FormLabel>
                      Engineering Actions{" "}
                      <span className={formStyle.error}>*</span>
                    </FormLabel>
                    <CustomInput
                      multiline
                      rows={3}
                      style={{ width: "100%" }}
                      {...register("engineering_actions")}
                    />
                    {errors.engineering_actions ? (
                      <span className={formStyle.error}>
                        {errors.engineering_actions?.message}
                      </span>
                    ) : null}
                  </Grid>

                  <Grid mt={1}>
                    <Typography>Files</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <PictureAsPdfIcon sx={{ color: "#ff0000" }} />
                      <span>
                        <a
                          href={data.document_full_path}
                          target="_blank"
                          style={{ color: "#393939", textDecoration: "none" }}
                        >
                          {data.file_name}
                        </a>
                      </span>
                    </Box>
                    <TextField
                      style={{ width: "100%" }}
                      type="file"
                      {...register("document")}
                    />
                  </Grid>

                  <Grid sx={{ m: "auto", my: 2, textAlign: "center" }}>
                    <Button variant="contained" type="submit">
                      Edit
                    </Button>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default editPartsMatrix;
