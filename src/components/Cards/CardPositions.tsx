import React from "react";
import { Card } from "./Card";
import { IPosition, ITicker } from "../../types";

interface ICardPositionsProps {
  positions: IPosition[];
  price: ITicker;
}

export default function CardPositions({
  positions,
  price,
}: ICardPositionsProps) {
  const formatCurrency = (value: string) => {
    return parseFloat(value).toFixed(2);
  };

  const calculatePL = (position: IPosition, price: ITicker) => {
    let diff = 0;
    if (position.side === "Sell") {
      diff = parseFloat(position.entryPrice) - parseFloat(price.lastPrice);
    }
    if (position.side === "Buy") {
      diff = parseFloat(price.lastPrice) - parseFloat(position.entryPrice);
    }

    const pl = diff * parseFloat(position.size);

    return pl.toFixed(4);
  };

  return (
    <>
      <Card header={"Positions"}>
        <div className="flex flex-col w-full">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Ticker
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Side
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Entry Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Mark Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        P&amp;L
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {positions
                      .filter((p) => parseFloat(p.size) > 0)
                      .map((row) => (
                        <tr key={row.positionIdx}>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {row.symbol}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {row.side}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {row.size}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {formatCurrency(row.positionValue)} USDT
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {formatCurrency(row.entryPrice)} USDT
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {price.lastPrice !== "0" ? price.lastPrice : row.markPrice}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                            {calculatePL(row, price)} USDT
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(positions, null, 2)}</pre> */}
        </div>
      </Card>
    </>
  );
}
