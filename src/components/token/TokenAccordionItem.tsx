import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion'
import { cn } from '@/lib/utils'

const TokenAccordionItem: React.FC<{
  value: string
  triggerClassName?: string
  contentClassName?: string
  wrapperClassName?: string
  name: JSX.Element
  content: JSX.Element
  suffixNode?: JSX.Element
}> = ({ value, name, content, triggerClassName, contentClassName, wrapperClassName, suffixNode }) => {
  return (
    <AccordionItem value={value} className={cn('card overflow-hidden p-0', wrapperClassName)}>
      <AccordionTrigger showArrow={false} className={cn('items-center justify-between p-4', triggerClassName)}>
        {name}
      </AccordionTrigger>
      <AccordionContent className={cn('border-border space-y-2 border-t border-dashed p-4', contentClassName)}>
        {content}
      </AccordionContent>
      {suffixNode}
    </AccordionItem>
  )
}

export default TokenAccordionItem
