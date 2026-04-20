import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shadcn/components/ui/button.tsx'
import { Input } from '@/shadcn/components/ui/input.tsx'
import { Textarea } from '@/shadcn/components/ui/textarea.tsx'
import { Label } from '@/shadcn/components/ui/label.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form.tsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select.tsx'
import { companySchema, getDefaultCompanyFormValues } from '@/features/companies/model/company.schema.ts'
import type { CompanyFormValues } from '@/features/companies/model/company.types.ts'
import { COMPANY_STATUS_LABELS, COMPANY_STATUSES } from '@/features/companies/model/company.constants.ts'

interface CompanyFormProps {
  defaultValues?: CompanyFormValues
  onSubmit: (data: CompanyFormValues) => void
  isPending: boolean
  submitLabel: string
  serverError?: string | null
  onCancel: () => void
}

export const CompanyForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
  serverError,
  onCancel,
}: CompanyFormProps) => {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultValues ?? getDefaultCompanyFormValues(),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {serverError && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter company description" rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={COMPANY_STATUSES.ACTIVE}>
                    {COMPANY_STATUS_LABELS.ACTIVE}
                  </SelectItem>
                  <SelectItem value={COMPANY_STATUSES.INACTIVE}>
                    {COMPANY_STATUS_LABELS.INACTIVE}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={0} placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : submitLabel}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
