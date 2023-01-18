import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ControlledInput } from "./TextInput/TextInput.controlled";
import { getPalette } from "../theme/theme.palette";
import { PopupComponent } from "./popup.component";
import { LoadingButton } from "@mui/lab";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  CreateReoccurringNotificationDto,
  NotificationModel,
} from "../swagger/api";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../redux/notes/notes.selectors";
import { notesActions } from "../redux/notes/notes.slice";

export interface ReminderComponentProps {
  handleClosePopup: () => void;
  handleConfirm: (value, type) => void;
  isLoading: boolean;
}

export const ReminderComponent: React.FC<ReminderComponentProps> = ({
  handleClosePopup,
  handleConfirm,
  isLoading,
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const [type, setType] = useState<NotificationModel.type>(
    NotificationModel.type.ONE_TIME
  );

  const isReminder = useSelector(notesSelectors.reminder).expression;

  const reminderId = useSelector(notesSelectors.reminder).id;
  const [oneTimeValue, setOneTimeValue] = useState<Dayjs | null>(
    dayjs("2048-01-01T00:00:00")
  );

  const [weeklyTime, setWeeklyTime] = useState<Dayjs | null>(
    dayjs("2048-01-01T00:00:00")
  );

  const [weeklyDay, setWeeklyDay] = useState<any>(
    CreateReoccurringNotificationDto.dayOfWeek.WED
  );

  const handleChangeOneTime = (newValue: Dayjs | null) => {
    setOneTimeValue(newValue);
  };

  const handleChangeHoursAndMins = (newValue: Dayjs | null) => {
    console.log(newValue.hour());
    setWeeklyTime(newValue);
  };

  const handleChangeDay = (event: SelectChangeEvent) => {
    setWeeklyDay(event.target.value as string);
  };

  useEffect(() => {}, [type]);

  return (
    <PopupComponent
      title="Reminder"
      handleClosePopup={handleClosePopup}
      children={
        <Box>
          {!isReminder && (
            <>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Typography>One Time</Typography>
                <Switch
                  defaultChecked={false}
                  onChange={(_event, checked) => {
                    if (checked) setType(NotificationModel.type.REOCCURRING);
                    if (!checked) setType(NotificationModel.type.ONE_TIME);
                  }}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Weekly </Typography>
              </Stack>

              {type === NotificationModel.type.ONE_TIME && (
                <Box sx={{ marginTop: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel
                      style={{
                        color: theme.palette.text.primary,
                        marginBottom: "2px",
                      }}
                      sx={{ width: "384px" }}
                    >
                      Date
                    </InputLabel>
                    <DateTimePicker
                      ampm={false}
                      value={oneTimeValue}
                      onChange={handleChangeOneTime}
                      renderInput={(params) => (
                        <TextField
                          sx={{
                            width: "396px",
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              )}

              {type === NotificationModel.type.REOCCURRING && (
                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ width: "384px", marginBottom: "30px" }}>
                    <InputLabel
                      style={{
                        color: theme.palette.text.primary,
                        marginBottom: "2px",
                      }}
                      sx={{ width: "384px" }}
                      id="demo-simple-select-label"
                    >
                      Day
                    </InputLabel>
                    <Select
                      sx={{
                        width: "384px",
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={weeklyDay}
                      label="Day"
                      color="secondary"
                      onChange={handleChangeDay}
                    >
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.MON}
                      >
                        <Typography> Monday </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.TUE}
                      >
                        <Typography> Tuesday </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.WED}
                      >
                        <Typography> Wednesday </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.THU}
                      >
                        <Typography> Thursday </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.FRI}
                      >
                        <Typography> Friday </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.SAT}
                      >
                        <Typography> Saturday </Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          color: "black",
                        }}
                        value={CreateReoccurringNotificationDto.dayOfWeek.SUN}
                      >
                        <Typography> Sunday </Typography>
                      </MenuItem>
                    </Select>
                  </Box>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel
                      style={{
                        color: theme.palette.text.primary,
                        marginBottom: "2px",
                      }}
                      sx={{ width: "384px" }}
                    >
                      Time
                    </InputLabel>
                    <TimePicker
                      ampm={false}
                      value={weeklyTime}
                      onChange={handleChangeHoursAndMins}
                      renderInput={(params) => (
                        <TextField
                          sx={{
                            width: "396px",
                            paddingRight: "0px",
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              )}
            </>
          )}

          {isReminder && (
            <Typography variant="h5" textAlign={"center"}>
              {isReminder}
            </Typography>
          )}

          <LoadingButton
            style={{
              marginTop: "60px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "203px",
              height: "55px",
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `rgba(0,0,0, 0.12) 0px 4px 8px 0px, rgba(0,0,0, 0.32) 0px 4px 32px 0px`,
            }}
            // disabled={Boolean(isReminder)}
            type="submit"
            onClick={() => {
              if (!isReminder) {
                if (type === NotificationModel.type.ONE_TIME) {
                  handleConfirm(
                    { triggerTime: oneTimeValue.toISOString() },
                    type
                  );
                }

                if (type === NotificationModel.type.REOCCURRING) {
                  handleConfirm(
                    {
                      dayOfWeek: weeklyDay,
                      hours: weeklyTime.hour(),
                      minutes: weeklyTime.minute(),
                      timezoneOffset: new Date().getTimezoneOffset(),
                    },
                    type
                  );
                }
              } else {
                dispatch(notesActions.removeReminder(reminderId));
              }
            }}
            loading={isLoading}
          >
            <Typography variant="h4">
              {isReminder ? "Remove" : "Confirm"}
            </Typography>
          </LoadingButton>
        </Box>
      }
    ></PopupComponent>
  );
};
