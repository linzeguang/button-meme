import React, { useCallback, useImperativeHandle, useState } from 'react'

import { useAtomValue } from 'jotai/react'
import { useNavigate } from 'react-router'

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
import { LOCALES } from '@/constants/settings'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { useI18nLocaleProviderContext } from '@/providers/I18nLocaleProvider'
import { ROUTE_PATH } from '@/routes'
import { projectsAtom } from '@/stores/token'

const Nav = React.forwardRef<
  { closeAccordion: () => void },
  { collapsed: boolean; className?: string; closeMenu?: () => void }
>(({ collapsed, className, closeMenu }, ref) => {
  const navigate = useNavigate()

  const [accordionValue, setAccordionValue] = useState<string>('')

  const { changeTheme } = useTheme()
  const projects = useAtomValue(projectsAtom)
  const { changeLocale } = useI18nLocaleProviderContext()

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
      childrens: projects.map(({ name, id }) => ({
        name,
        onClick: () => navigate(ROUTE_PATH.TOKEN + `/${id}`)
      }))
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
          onClick: () => {
            closeMenu?.()
            changeTheme('light')
          }
        },
        {
          name: 'Dark Mode',
          onClick: () => {
            closeMenu?.()
            changeTheme('dark')
          }
        }
      ]
    },
    {
      name: 'Locale',
      value: 'locale',
      icon: Sidebar.Locale,
      childrens: Object.values(LOCALES).map(({ name, locale }) => ({
        name,
        onClick: () => {
          closeMenu?.()
          changeLocale(locale)
        }
      }))
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

  useImperativeHandle(
    ref,
    () => ({
      closeAccordion: () => setAccordionValue('')
    }),
    []
  )

  return (
    <AccordionRoot
      className={cn('space-y-3.5', className)}
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
  )
})

export default Nav
