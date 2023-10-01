import React from "react";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import "../App.css";
import { Button, MantineProvider } from "@mantine/core";
import { BiSolidCalendarWeek } from "react-icons/bi";
import { theme } from "flowbite-react";
// const DatePicker = () => {
//   return (
//     <div>DatePicker</div>
//   )
// }

function DatePicker({ from, setFrom, to, setTo }) {
  //   const styles = (theme) => ({});
  return (
    <MantineProvider
      inherit
      theme={{
        components: {
          //   InputWrapper: {
          //     styles: (theme) => ({
          //       label: {
          //         backgroundColor:
          //           theme.colorScheme === "dark"
          //             ? "rgba(255, 255, 255, .1)"
          //             : "rgba(0, 0, 0, .1)",
          //       },
          //     }),
          //   },

          Input: {
            styles: (theme) => ({
              input: {
                padding: "9px",
                color: "#fafafa",
                border: "bold",

                borderColor: theme.colors.dark[3],
              },
            }),
          },
        },
      }}
    >
      <div className="flex flex-row items-center justify-center gap-1">
        <DatePickerInput
          icon={
            <BiSolidCalendarWeek
              size="1.2rem"
              className="text-base"
              stroke={1.5}
            />
          }
          label="From date"
          labelProps={{ style: { color: "white" } }}
          className="bg-transparent  "
          placeholder="From"
          value={from}
          onChange={(e) => {
            setFrom(e);
            setTo(null);
          }}
          mx="auto"
          maw={400}
        />
        <DatePickerInput
          icon={
            <BiSolidCalendarWeek
              size="1.2rem"
              className="text-base"
              stroke={1.5}
            />
          }
          label="To date"
          labelProps={{ style: { color: "white" } }}
          disabled={!from}
          //   label="Pick date"
          className="bg-transparent "
          placeholder="To"
          value={to}
          onChange={setTo}
          mx="auto"
          minDate={from}
          maw={400}
        />
      </div>
    </MantineProvider>
  );
}
export default DatePicker;
