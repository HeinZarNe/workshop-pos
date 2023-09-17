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

function DatePicker() {
  const [value, setValue] = useState();
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
                border: 'bold' ,
                borderRadius: "4px 0px 0 4px",
                borderColor: theme.colors.dark[3],
              },
            }),
          },
        },
      }}
    >
      <DatePickerInput
        icon={<BiSolidCalendarWeek size="1.2rem" className="text-base" stroke={1.5} />}
        //   label="Pick date"
        className="bg-transparent "
        placeholder="Pick date"
        value={value}
        onChange={setValue}
        mx="auto"
        maw={400}
      />
    </MantineProvider>
  );
}
export default DatePicker;
