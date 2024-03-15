import { createPartsMatrix } from "@/api/functions/parts.api";
import { PartsMatrixType } from "@/interface/createpart.interface";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import formStyle from "@/styles/pages/form.module.scss";
import CustomInput from "@/ui/Inputs/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
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
    document: yup.mixed().required()
  })
  .required();

const createParts = () => {
  const router = useRouter();
  console.log(router);
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

  const queryClient = useQueryClient();

  const watchPartTypeCheck = watch("part_type");

  const watchDamperCheck = watch("damper");

  const watchValveCheck = watch("valve");

  useEffect(() => {
    if (watchPartTypeCheck === "input" || watchPartTypeCheck === "output") {
      register("damper");
      register("valve");
      unregister("controller_ao");
      unregister("controller_ai");
      unregister("controller_di");
      unregister("controller_do");
    } else if (watchPartTypeCheck === "controller") {
      unregister("damper");
      unregister("valve");
      register("controller_ao");
      register("controller_ai");
      register("controller_di");
      register("controller_do");
    } else {
      unregister("damper");
      unregister("valve");
      unregister("controller_ao");
      unregister("controller_ai");
      unregister("controller_di");
      unregister("controller_do");
    }
  }, [register, unregister, watchPartTypeCheck]);

  const { mutate } = useMutation({
    mutationFn: createPartsMatrix
  });

  const onSubmit: SubmitHandler<PartsMatrixType> = async (data) => {
    let partdata = new FormData();

    partdata.append("part_no", data.part_no);
    partdata.append("description", data.description);
    partdata.append("manufacturer", data.manufacturer);
    partdata.append("price", data.price?.toString());
    partdata.append("part_type", data.part_type);
    partdata.append("commissioning_actions", data.commissioning_actions);
    partdata.append("engineering_actions", data.engineering_actions);
    partdata.append(
      "controller_ao",
      data.controller_ao ? data.controller_ao.toString() : ""
    );
    partdata.append(
      "controller_ai",
      data.controller_ai ? data.controller_ai.toString() : ""
    );
    partdata.append(
      "controller_di",
      data.controller_di ? data.controller_di.toString() : ""
    );
    partdata.append(
      "controller_do",
      data.controller_do ? data.controller_do.toString() : ""
    );
    partdata.append("damper", data.damper ? "1" : "0");
    partdata.append("valve", data.valve ? "1" : "0");
    partdata.append(
      "damper_length",
      data.damper_length ? data.damper_length : ""
    );
    partdata.append("damper_width", data.damper_width ? data.damper_width : "");
    partdata.append("torque", data.torque ? data.torque : "");
    partdata.append("signal_type", data.signal_type ? data.signal_type : "");
    partdata.append(
      "dumper_valve_type",
      data.dumper_valve_type ? data.dumper_valve_type : ""
    );
    partdata.append("valve_cv", data.valve_cv ? data.valve_cv : "");
    partdata.append(
      "valve_pipe_diameter_inch",
      data.valve_pipe_diameter_inch ? data.valve_pipe_diameter_inch : ""
    );
    partdata.append("valve_type", data.valve_type ? data.valve_type : "");
    partdata.append(
      "valve_body_style",
      data.valve_body_style ? data.valve_body_style : ""
    );
    partdata.append("document", data.document[0]);

    mutate(partdata, {
      onSuccess: (res: any) => {
        if (res?.code === 200) {
          reset();
          // queryClient.invalidateQueries({ queryKey: ["matrixlist"] });
          toast.success(res?.message);
          router.back();
        }
      },
      onError: (e) => {
        toast.error("not saved");
      }
    });
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
              Create Part Matrix
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
                      render={({ field }) => (
                        <Select
                          {...field}
                          style={{ width: "100%" }}
                          defaultValue=""
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
                              render={({
                                field: { onChange, onBlur, value, ref }
                              }) => (
                                <Select
                                  style={{ width: "100%" }}
                                  {...register("signal_type")}
                                  defaultValue=""
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
                              render={({
                                field: { onChange, onBlur, value, ref }
                              }) => (
                                <Select
                                  style={{ width: "100%" }}
                                  defaultValue=""
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
                    {/* <Controller
                      control={control}
                      name="document"
                      // rules={{ required: "Document is required" }}
                      render={({ field }) => {
                        return (
                          <Input
                            {...field}
                            // value={value}
                            onChange={(e) => {
                              //
                              field.onChange(e.target.files);
                            }}
                            type="file"
                            id="document"
                          />
                        );
                      }}
                    /> */}

                    <TextField
                      id="upload-doc"
                      fullWidth
                      placeholder="Upload doc"
                      type="file"
                      {...register("document")}
                    />
                    {errors.document ? (
                      <span className={formStyle.error}>
                        {errors.document?.message}
                      </span>
                    ) : null}
                  </Grid>

                  <Typography sx={{ m: "auto", my: 2, textAlign: "center" }}>
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                  </Typography>
                </form>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
};

export default createParts;
