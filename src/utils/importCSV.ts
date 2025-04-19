// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function importCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const text = event.target?.result;
        if (typeof text !== "string") return reject("Formato inválido");
  
        const lines = text.split("\n").filter(Boolean);
        const headers = lines[0].split(",").map((h) => h.trim());
        const data = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
        });
  
        resolve(data);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }
  