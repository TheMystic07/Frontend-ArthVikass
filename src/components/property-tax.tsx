"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PayButton } from "./pay-button";

export function PropertyTax() {
  const [baseValue, setBaseValue] = useState(0);
  const [buildingType, setBuildingType] = useState("residential");
  const [buildingAge, setBuildingAge] = useState(0);
  const [floors, setFloors] = useState(0);
  const [useCategory, setUseCategory] = useState("residential");
  const [builtUpArea, setBuiltUpArea] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    calculateTotalTax();
  }, [baseValue, buildingType, buildingAge, floors, useCategory, builtUpArea]);

  const calculateTotalTax = () => {
    let tax = 0;
    if (buildingType === "residential") {
      tax = baseValue * 0.01;
    } else if (buildingType === "commercial") {
      tax = baseValue * 0.02;
    } else if (buildingType === "industrial") {
      tax = baseValue * 0.03;
    } else {
      tax = baseValue * 0.015;
    }

    if (buildingAge < 10) {
      tax *= 1.1;
    } else if (buildingAge >= 10 && buildingAge < 20) {
      tax *= 1.05;
    }

    tax *= floors;
    tax *= builtUpArea / 100;
    setTotalTax(Math.round(tax));
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 sm:p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Property Tax Calculator</CardTitle>
        <CardDescription>Enter your property details to calculate the total property tax owed.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="base-value">Base Value</Label>
              <Input
                id="base-value"
                type="number"
                placeholder="Enter base value"
                value={baseValue}
                onChange={(e) => setBaseValue(parseInt(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="building-type">Building Type</Label>
              <Select id="building-type" value={buildingType} onValueChange={(value) => setBuildingType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="building-age">Building Age</Label>
              <Input
                id="building-age"
                type="number"
                placeholder="Enter building age"
                value={buildingAge}
                onChange={(e) => setBuildingAge(parseInt(e.target.value))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="floors">Number of Floors</Label>
              <Input
                id="floors"
                type="number"
                placeholder="Enter number of floors"
                value={floors}
                onChange={(e) => setFloors(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="use-category">Use Category</Label>
              <Select id="use-category" value={useCategory} onValueChange={(value) => setUseCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select use category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="built-up-area">Built-up Area</Label>
              <Input
                id="built-up-area"
                type="number"
                placeholder="Enter built-up area"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(parseInt(e.target.value))}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="grid gap-2">
          <div className="text-lg font-bold">Total Property Tax: ₹{totalTax}</div>
          <div className="text-sm text-muted-foreground">
            This is an estimated calculation based on the information provided.
          </div>
          <PayButton catagory="Property Tax" amount={totalTax} />
        </div>
      </CardFooter>
    </Card>
  );
}
