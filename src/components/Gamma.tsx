import React, { useEffect, useState } from 'react';

import {wineData} from "./data.js";

interface TableRow {
  rowName: string;
  classs1: number;
  classs2: number;
  classs3: number;
}

const Gamma: React.FC = () => {
 
  const [tableData, setTableData] = useState<TableRow[]>([]);

    const mean = (values: any) => {

      if (values.length === 0) {
        return 0; // Avoid division by zero for an empty array
      }

      const totalGamma = values.reduce((acc:number, curr:number) => acc + +curr, 0);
      const meanGamma = totalGamma / values.length;
      return meanGamma.toFixed(3);
    }



    const  median = (values: any) => {
      if (values.length === 0) {
        return 0; // Median undefined for an empty array
      }
    
      const sortedValues = values.slice().sort((a:number, b:number) => +a - +b);
      const middleIndex = Math.floor(sortedValues.length / 2);
    
      if (sortedValues.length % 2 === 0) {
        // If the array has an even number of elements, return the average of the middle two
        return ((sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2).toFixed(3);
      } else {
        // If the array has an odd number of elements, return the middle element
        return sortedValues[middleIndex].toFixed(3);
      }
    }



    const  mode = (values: any) => {
      if (values.length === 0) {
        return 'No mode for an empty array';
      }
    
      const valueCountMap = new Map<number, number>();
      let maxCount = 0;
    
      values.forEach((value:any) => {
        const count = (valueCountMap.get(value) || 0) + 1;
        valueCountMap.set(value, count);
    
        if (count > maxCount) {
          maxCount = count;
        }
      });
    
      const modes: any  = [];
      valueCountMap.forEach((count, value) => {
        if (count === maxCount) {
          modes.push(value);
        }
      });
      if (modes.length === 1) {
        return modes[0]; // Single mode
      } else if (modes.length > 1 && modes.length < values.length) {
        return modes; // Multiple modes
      } else {
        return 'Uniformly distributed'; // No mode
      }
    }


    const orderClass = () => {

        let colName = ['Gamma Mean', 'Gamma Median', 'Gamma Mode'];
        let tableArray = [];
        for (let i=0; i<3; i++){
            let obj = {'rowName': colName[i], classs1:0, classs2:0, classs3: 0};
          
            if( i === 0){             
             let class1 = wineData.filter((ele) => ele.Alcohol === 1);
             let gammaValues1 = class1.map((ele) =>  (+ele.Ash * +ele.Hue) / +ele.Magnesium);
             let class1Result = +mean(gammaValues1);
             let class2 = wineData.filter((ele) => ele.Alcohol === 2);
             let gammaValues2 = class2.map((ele) =>(+ele.Ash * +ele.Hue) / +ele.Magnesium);
             let class2Result = +mean(gammaValues2);
             let class3 = wineData.filter((ele) => ele.Alcohol === 3);
             let gammaValues3 = class3.map((ele) => (+ele.Ash * +ele.Hue) / +ele.Magnesium);
             let class3Result = +mean(gammaValues3);
             obj.classs1 = class1Result;
             obj.classs2 = class2Result;
             obj.classs3 = class3Result;
             tableArray.push(obj);
            }
            else if (i === 1) {           
                let class1 = wineData.filter((ele) => ele.Alcohol === 1);
                let gammaValues1 = class1.map((ele) => (+ele.Ash * +ele.Hue) / +ele.Magnesium);
                let class1Result = +median(gammaValues1);
                let class2 = wineData.filter((ele) => ele.Alcohol === 2);
                let gammaValues2 = class2.map((ele) =>(+ele.Ash * +ele.Hue) / +ele.Magnesium);
                let class2Result = +median(gammaValues2);
                let class3 = wineData.filter((ele) => ele.Alcohol === 3);
                let gammaValues3 = class3.map((ele) => (+ele.Ash * +ele.Hue) / +ele.Magnesium);
                let class3Result = +median(gammaValues3);
                obj.classs1 = class1Result;
                obj.classs2 = class2Result;
                obj.classs3 = class3Result;
                tableArray.push(obj);
               }
               else {
                let class1 = wineData.filter((ele) => ele.Alcohol === 1);
                let gammaValues1 = class1.map((ele) => (+ele.Ash * +ele.Hue) / +ele.Magnesium);
                let class1Result = mode(gammaValues1);
                let class2 = wineData.filter((ele) => ele.Alcohol === 2);
                let gammaValues2 = class2.map((ele) => (+ele.Ash * +ele.Hue) / +ele.Magnesium);
                let class2Result =  mode(gammaValues2);
                let class3 = wineData.filter((ele) => ele.Alcohol === 3);
                let gammaValues3 = class3.map((ele) =>(+ele.Ash * +ele.Hue) / +ele.Magnesium);
                let class3Result = mode(gammaValues3);
                obj.classs1 = class1Result;
                obj.classs2 = class2Result;
                obj.classs3 = class3Result;
                tableArray.push(obj);
               }
            }
            setTableData(tableArray)
        }

useEffect(()=> {
  orderClass();
},[])
 

  return (
    <div className='class-container'>
            <h2 className='heading'>Gamma-wise-table</h2>
      <table className='table'>
        <thead>
          <tr>
          <th>Measure</th>
          <th>Class 1</th>
          <th>Class 2</th>
          <th>Class 3</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((ele) => (
            <tr>
              <th>{ele.rowName}</th>
              <td>{ele.classs1}</td>
              <td>{ele.classs2}</td>
              <td>{Array.isArray(ele.classs3) ? ele.classs3.join(',') : ele.classs3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Gamma;