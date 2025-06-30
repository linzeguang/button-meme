import React, { useCallback, useState } from 'react'

import { Sidebar } from '@/components/svgr'
import {
  AccordionArrow,
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger
} from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Dividing } from '@/components/ui/Dividing'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { cn, toggleLight } from '@/lib/utils'

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [accordionValue, setAccordionValue] = useState<string>('')

  const accordionOptions: Array<
    | {
        name: React.ReactNode
        value: string
        icon: React.FunctionComponent<
          React.SVGProps<SVGSVGElement> & {
            title?: string
            titleId?: string
            desc?: string
            descId?: string
          }
        >
        childrens?: {
          name: React.ReactNode
          onClick: () => void
        }[]
      }
    | undefined
  > = [
    {
      name: 'Token',
      value: 'token',
      icon: Sidebar.Home,
      childrens: [
        {
          name: 'Token List',
          onClick: () => {}
        },
        {
          name: 'Token List',
          onClick: () => {}
        }
      ]
    },
    undefined,
    {
      name: 'Doc',
      value: 'doc',
      icon: Sidebar.Doc
    },
    {
      name: 'Tutorial',
      value: 'tutorial',
      icon: Sidebar.Tutorial
    },
    undefined,
    {
      name: 'Twitter',
      value: 'x',
      icon: Sidebar.X
    },
    undefined,
    {
      name: 'Theme',
      value: 'theme',
      icon: Sidebar.Theme,
      childrens: [
        {
          name: 'Light Mode',
          onClick: () => toggleLight()
        },
        {
          name: 'Dark Mode',
          onClick: () => toggleLight()
        }
      ]
    },
    {
      name: 'Locale',
      value: 'locale',
      icon: Sidebar.Locale,
      childrens: [
        {
          name: 'English',
          onClick: () => toggleLight()
        },
        {
          name: 'English',
          onClick: () => toggleLight()
        }
      ]
    }
  ]

  const renderAccordionTrigger = useCallback(
    (option: Exclude<(typeof accordionOptions)[number], undefined>) => {
      return (
        <Flex
          className={cn(
            'hover:text-primary hover:[&_.accordion-arrow]:text-primary flex-1 cursor-pointer items-center',
            collapsed && 'justify-center'
          )}
        >
          <option.icon className="w-10" />
          <HarmonyOSSansText
            className={cn(
              'flex-1 overflow-hidden text-sm font-bold whitespace-nowrap text-inherit',
              collapsed && 'w-0'
            )}
          >
            {option.name}
          </HarmonyOSSansText>
          {option.childrens && <AccordionArrow className={cn('text-accordion-arrow', collapsed && 'w-0')} />}
        </Flex>
      )
    },
    [collapsed]
  )

  return (
    <div className="relative row-span-2 w-14">
      <aside
        className={cn(
          'absolute z-10 h-full',
          'aside px-2 py-3 transition-all [&_*]:transition-all',
          'data-[collapsed=false]:w-50 data-[collapsed=true]:w-14'
        )}
        data-collapsed={collapsed}
        onMouseEnter={() => {
          setCollapsed(false)
        }}
        onMouseLeave={() => {
          setCollapsed(true)
          setAccordionValue('')
        }}
      >
        <AccordionRoot
          className="space-y-3.5"
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={setAccordionValue}
        >
          {accordionOptions.map((option, index) =>
            !option ? (
              <Dividing key={index} />
            ) : (
              <AccordionItem key={option.value} value={option.value}>
                {option.childrens ? (
                  <>
                    <AccordionTrigger showArrow={false}>{renderAccordionTrigger(option)}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1 text-balance">
                      {option.childrens.map((children, i) => (
                        <a
                          key={i}
                          className="bg-background-tertiary hover:text-primary block cursor-pointer py-1 pl-10 text-xs"
                          onClick={(ev) => {
                            ev.preventDefault()
                            children.onClick()
                          }}
                        >
                          {children.name}
                        </a>
                      ))}
                    </AccordionContent>
                  </>
                ) : (
                  renderAccordionTrigger(option)
                )}
              </AccordionItem>
            )
          )}
        </AccordionRoot>
      </aside>
    </div>
  )
}

export default SideBar
