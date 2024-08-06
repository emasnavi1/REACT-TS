interface Props<T> {
  data: T[];
}

export default function AppTable<T extends Object>({ data }: Props<T>) {
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const keys = Object.keys(data[0]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>{String(item[key as keyof T])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}


// simple table example for your ease of underestadning:
// const data = [
//   { id: 1, name: 'Item 1', value: 'Value 1' },
//   { id: 2, name: 'Item 2', value: 'Value 2' },
//   { id: 3, name: 'Item 3', value: 'Value 3' },
// ];

// const TableComponent = () => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(item => (
//           <tr key={item.id}>
//             <td>{item.id}</td>
//             <td>{item.name}</td>
//             <td>{item.value}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };