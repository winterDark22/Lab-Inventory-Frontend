import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Category,
  BarSeries,
} from "@syncfusion/ej2-react-charts";

import { useEffect, useState } from "react";

export function Chart() {
  const [equipments, setAllEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch("/api/equipments/");

        const json = await response.json();

        if (response.ok) {
          setAllEquipments(json);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEquipments();
  }, []);

  //   let data = [
  //     { x: "Jan", y: 50 },
  //     { x: "Feb", y: 57 },
  //     { x: "Mar", y: 48 },
  //     { x: "Apr", y: 60 },
  //     { x: "May", y: 70 },
  //     { x: "Jun", y: 48 },
  //   ];

  const data = equipments.map((equipment) => ({
    x: equipment.equipment_name,
    y: equipment.available,
  }));

  return (
    <ChartComponent
      primaryXAxis={{
        valueType: "Category",
        title: "Equipments",
      }}
      primaryYAxis={{
        title: "Quantity in Stock",
      }}
    >
      <Inject services={[BarSeries, Category]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          xName="x"
          yName="y"
          type="Bar"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
