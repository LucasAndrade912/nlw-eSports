import React from 'react'
import * as Select from '@radix-ui/react-select'
import { Check } from 'phosphor-react'

interface SelectItemProps {
  id: string
  title: string
}

export function SelectItem({ id, title }: SelectItemProps) {
  return (
    <Select.Item value={id} className="flex items-center gap-2 hover:text-zinc-100 flex-1 hover:bg-zinc-700 p-4 cursor-pointer">
      <Select.ItemIndicator>
          <Check className="w-5 h-5 text-violet-500" />
        </Select.ItemIndicator>

      <Select.ItemText>
        { title }
      </Select.ItemText>
    </Select.Item>
  )
}