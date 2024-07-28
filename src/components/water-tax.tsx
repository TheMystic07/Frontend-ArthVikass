"use client"

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PayButton } from "./pay-button";

export function WaterTax() {
  const [amount, setAmount] = useState(0);
  const gst = 0.08;
  const total = amount + 500 + amount * gst;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[600px] h-[350px] p-6 sm:p-8">
        <CardHeader>
          <CardTitle>Water Tax Payment</CardTitle>
          <CardDescription>
            Enter the amount you owe for your water tax. The total due, including 8% GST, will be calculated automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="amount">Water Tax Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-1">
            <Label>Total Due</Label>
            <p className="text-lg font-medium">₹{total.toFixed(2)} (including 8% GST)</p>
          </div>
        </CardContent>
        <CardFooter>
          <PayButton catagory={"Water Tax"} amount={total} />
        </CardFooter>
      </Card>
    </div>
  );
}
