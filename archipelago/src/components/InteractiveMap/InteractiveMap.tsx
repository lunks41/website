import * as React from "react";
import { useEffect, useRef } from "react";
import {
  MapsComponent,
  Inject,
  ILoadedEventArgs,
  MapsTheme,
  LayersDirective,
  LayerDirective,
  MapsTooltip,
  Marker,
  MarkersDirective,
  MarkerDirective,
} from "@syncfusion/ej2-react-maps";
import {
  CheckBoxComponent,
  ChangeEventArgs,
} from "@syncfusion/ej2-react-buttons";
import { Browser } from "@syncfusion/ej2-base";
import * as data from "./top-population.json";
import * as worldMap from "./world-map.json";
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    tr {
        height: 50px;
    }
    .tailwind tr, .tailwind-dark tr {
        height: 70px;
    }`;
const MarkerMaps = () => {
  let mapInstance = useRef<MapsComponent>(null);
  let template: string =
    '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background-color: white;box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
    '<div style="font-size:13px;color:black;font-weight: 500;"><center>Head Office</center></div>' +
    '<div><span style="font-size:13px;color:black">Country : </span><span style="font-size:13px;color:black;font-weight: 500;">${Country}</span></div>' +
    '<div><span style="font-size:13px;color:black">Location : </span><span style="font-size:13px;color:black;font-weight: 500;">${name}</span></div>';

  const onMapsLoad = (): void => {
    let maps: HTMLElement | null = document.getElementById("maps");
    if (maps) {
      maps.setAttribute("title", "");
    }
  };

  const load = (args: ILoadedEventArgs): void => {};
  return (
    <div className="control-pane w-100">
      <style>{SAMPLE_CSS}</style>
      <div className="col-lg-9 control-section w-100">
        <MapsComponent
          id="maps"
          loaded={onMapsLoad}
          load={load}
          ref={mapInstance}
          useGroupingSeparator={true}
          format={"n"}
          zoomSettings={{ enable: false }}
          titleSettings={{
            text: "",
            textStyle: { size: "16px" },
          }}
        >
          <Inject services={[Marker, MapsTooltip]} />
          <LayersDirective>
            <LayerDirective
              shapeData={worldMap}
              shapePropertyPath="name"
              shapeDataPath="Country"
              dataSource={datasource.population}
              shapeSettings={{ fill: "#C3E6ED" }}
            >
              <MarkersDirective>
                <MarkerDirective
                  visible={true}
                  animationDuration={0}
                  shape="Circle"
                  fill="white"
                  width={10}
                  border={{ color: "#285255", width: 2 }}
                  dataSource={datasource.population}
                  tooltipSettings={{
                    template: template,
                    visible: true,
                    valuePath: "population",
                  }}
                />
              </MarkersDirective>
            </LayerDirective>
          </LayersDirective>
        </MapsComponent>
      </div>
    </div>
  );
};
export default MarkerMaps;
