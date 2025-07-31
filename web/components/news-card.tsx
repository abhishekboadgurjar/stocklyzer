import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"
import Image from "next/image"

interface NewsCardProps {
  headline: string
  summary: string
  source: string
  datetime: number
  image?: string
  url: string
  category?: string
}

export function NewsCard({ headline, summary, source, datetime, image, url, category }: NewsCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight line-clamp-2">{headline}</CardTitle>
          {image && (
            <div className="flex-shrink-0">
              <Image
                src={image || "/placeholder.svg"}
                alt={headline}
                width={80}
                height={60}
                className="rounded object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{source}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(datetime)}</span>
            </div>
          </div>

          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-sm text-primary hover:underline"
        >
          <span>Read more</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  )
}
