"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import advocatesClient from "@/services/advocates.client";
import { IAdvocate } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SortingState } from "@tanstack/react-table";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const DEFAULT_LIMIT = 5;

const DEFAULT_SORT: { [key: string]: number } = {
  lastName: 1,
};

/**
 * Renders the Home component.
 *
 * @returns The rendered Home component.
 */
export default function Home() {
  const [advocates, setAdvocates] = useState<IAdvocate[]>([]);
  const searchTerm = useRef<string>();
  const page = useRef<number>(1);
  const limit = useRef<number>(DEFAULT_LIMIT);
  const totalNumPages = useRef<number>(0);
  const totalNumAdvocates = useRef<number>(0);
  const [sorting, setSorting] = useState<SortingState>(Object.keys(DEFAULT_SORT).map(key => ({ id: key, desc: DEFAULT_SORT[key] === -1 })));
  const pageSorts = useRef(DEFAULT_SORT);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  /**
   * Filters advocates based on the provided last name, page number, and limit.
   * 
   * @param lastName - The last name to filter advocates by.
   * @param newPage - The page number to retrieve.
   * @param newLimit - The maximum number of advocates to retrieve per page.
   */
  const filterAdvocates = useCallback(async (lastName: string = "", newPage: number = 1, newLimit: number = DEFAULT_LIMIT) => {
    setIsLoading(true);
    searchTerm.current = lastName;
    page.current = newPage;
    limit.current = newLimit;

    console.log({ lastName, limit: newLimit, page: newPage, sorts: pageSorts.current });
    const { data, totalNumPages: _totalNumPages, totalNumAdvocates: _totalNumAdvocates } = await advocatesClient
      .getAdvocates({ lastName, limit: newLimit, page: newPage, sorts: pageSorts.current })
      .catch(error => {
        console.error("Error fetching advocates", error);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Unable to fetch advocates. Please try again later.",
        })
        return { data: [], totalNumPages: 0, totalNumAdvocates: 0 };
      })

    setAdvocates(data);
    totalNumPages.current = _totalNumPages;
    totalNumAdvocates.current = _totalNumAdvocates;
    setIsLoading(false);

  }, []);

  /**
   * Converts the sorting state into a new object with numeric values.
   * 
   * @param sorting - The sorting state to be converted.
   */
  const convertSortingState = useCallback((sorting: SortingState) => {
    const newSorts: { [key: string]: number } = {};
    for (const sort of sorting) {
      const { id, desc } = sort;
      newSorts[id] = desc ? -1 : 1;
    }

    pageSorts.current = newSorts;
    console.log("sorting", pageSorts.current);
    filterAdvocates(searchTerm.current ?? "", page.current, limit.current);

  }, [filterAdvocates]);

  useEffect(() => {
    convertSortingState(sorting);
  }, [sorting, convertSortingState]);

  useEffect(() => {
    filterAdvocates("", page.current, limit.current);
  }, [filterAdvocates]);

  /**
   * Navigates to a specific page.
   * 
   * @param newPage - The page number to navigate to.
   */
  const goToPage = useCallback((newPage: number) => {
    page.current = newPage;
    console.log("Go to page", newPage);
    filterAdvocates(searchTerm.current ?? "", newPage, limit.current);
  }, [filterAdvocates]);

  /**
   * Navigates to the next page.
   */
  const nextPage = useCallback(() => {
    goToPage(page.current + 1);
  }, [goToPage]);

  /**
   * Navigates to the previous page.
   */
  const prevPage = useCallback(() => {
    goToPage(page.current - 1);
  }, [goToPage]);

  /**
   * Clears the filter and resets the page sorts to default.
   * Calls the 'filterAdvocates' function with empty filter parameters.
   */
  const clearFilter = useCallback(() => {
    pageSorts.current = DEFAULT_SORT;
    filterAdvocates("", page.current, limit.current);
  }, [filterAdvocates]);

  /**
   * Handles the change event of an input element.
   * 
   * @param e - The change event object.
   */
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(e.target.value);
    if (newPage > 0 && newPage <= totalNumPages.current) {
      goToPage(newPage);
    }
  }, [goToPage]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Advocates Control Panel</h1>
      <div className="flex items-center space-x-2 py-4">
        <Input
          type='text'
          autoComplete='off'
          placeholder="Search by Last Name"
          value={searchTerm.current ?? ""}
          onChange={(e) => filterAdvocates(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={clearFilter} >clear</Button>
      </div>
      <DataTable sorting={sorting} setSorting={setSorting} columns={columns} data={advocates} isLoading={isLoading} />
      <div className="flex items-center justify-end space-x-2 py-4">
        Page <Input onChange={handleOnChange} className="w-12 m-2 text-center" value={page.current}></Input> of {totalNumPages.current}
        <Button
          variant="outline"
          size="sm"
          onClick={() => prevPage()}
          disabled={page.current == 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => nextPage()}
          disabled={page.current >= totalNumPages.current}
        >
          Next
        </Button>
      </div>
      <Toaster />
    </main>
  );
}
