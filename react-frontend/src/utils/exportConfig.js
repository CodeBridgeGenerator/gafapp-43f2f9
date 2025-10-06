import map from "lodash/map";

const exportConfig = {
  fields: {
    selectedJobStations: {
      format: (value) => {
        if (!Array.isArray(value)) return "No Job Stations";
        const stations = map(value, (station) => {
          const stationName = station.name || "Unknown Station";
          const technicianName = station.technicianId && station.technicianId.name 
            ? station.technicianId.name 
            : "Unassigned";
          return `${stationName} (${technicianName})`;
        });
        return `[${stations.join(", ")}]`;
      },
    },
    vendingControllerChecklistResponse: {
      format: (value) => {
        if (!Array.isArray(value)) return "No Responses";
        const responses = map(value, (response) => {
          if (!response.checkId || !response.checkListId) return "Unknown: No Response";
          const checkName = response.checkId.name || "Unknown Check";
          return `${checkName}: ${response.responseValue || "No Response"}`;
        });
        return responses.join(", ");
      },
    },
    machineImage: {
      format: (value) => {
        if (!Array.isArray(value)) return "No Images";
        const urls = map(value, (doc) => doc.url || "Unknown URL");
        return urls.join(", ");
      },
    },
  },
};

export default exportConfig;