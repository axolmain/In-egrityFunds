import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Budget, BudgetFormProps } from "@/types/financialTypes";
import { usePlaidTransactions } from "@/hooks/usePlaidTransactions";

const createFormSchema = (spendingCategories: string[]) => z.object({
    name: z.string().min(2, {
        message: "Budget name must be at least 2 characters.",
    }),
    amount: z.number().min(0, {
        message: "Amount must be a positive number.",
    }),
    timePeriod: z.enum(["monthly", "weekly", "yearly"]),
    spendingCategories: z.enum(spendingCategories as [string, ...string[]]),
});

export function BudgetForm({ onSubmit, initialData = {}, onCancel, user }: BudgetFormProps) {
    const {
        transactions,
        loading: transactionsLoading,
        error: transactionsError,
    } = usePlaidTransactions(user?.sub || '');

    const spendingCategories = useMemo(() =>
            Array.from(new Set(transactions.flatMap(t => t.category))),
        [transactions]
    );

    const formSchema = useMemo(() => createFormSchema(spendingCategories), [spendingCategories]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name || "",
            amount: initialData.amount || 0,
            timePeriod: initialData.timePeriod || "monthly",
            spendingCategories: initialData.spendingCategories || '',
        },
    });

    function handleSubmit(values: z.infer<typeof formSchema>) {
        const budgetData: Budget = {
            ...values,
            spent: initialData.spent || 0,
            id: initialData.id
        };
        onSubmit(budgetData);
        form.reset();
    }

    if (transactionsLoading) {
        return <div>Loading spending categories...</div>;
    }

    if (transactionsError) {
        return <div>Error loading spending categories. Please try again.</div>;
    }

    if (spendingCategories.length === 0) {
        return <div>No spending categories available. Please add some transactions first.</div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget Name</FormLabel>
                            <FormControl>
                                <Input placeholder="E.g., Groceries, Entertainment" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter a name for your budget category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget Amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter budget amount" {...field} onChange={e => field.onChange(+e.target.value)} />
                            </FormControl>
                            <FormDescription>
                                Enter the amount for this budget category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timePeriod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time Period</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a time period" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose the time period for this budget.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="spendingCategories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Spending Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a spending category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {spendingCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose the spending category for this budget.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between">
                    <Button type="submit">
                        {initialData.id ? 'Update Budget' : 'Add Budget'}
                    </Button>
                    {onCancel && (
                        <Button type="button" variant="destructive" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}