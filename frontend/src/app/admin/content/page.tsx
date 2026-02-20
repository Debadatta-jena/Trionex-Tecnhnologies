import { Metadata } from 'next';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  Image,
  Video,
  File,
  Globe,
  BarChart3
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const metadata: Metadata = {
  title: 'Content Management - Trionox Technologies',
  description: 'Manage website content, blog posts, pages, and media assets for the Trionox platform.',
};

// Mock content data
const contentItems = [
  {
    id: '1',
    title: 'AI Transformation: How Enterprises Are Leading the Revolution',
    type: 'blog-post',
    status: 'published',
    author: 'Dr. Sarah Chen',
    publishDate: '2024-01-15',
    views: 12453,
    likes: 342,
    comments: 28,
    category: 'AI & Machine Learning',
    featured: true,
  },
  {
    id: '2',
    title: 'About Us - Our Mission and Vision',
    type: 'page',
    status: 'published',
    author: 'Content Team',
    publishDate: '2024-01-10',
    views: 8921,
    likes: 156,
    comments: 12,
    category: 'Company',
    featured: false,
  },
  {
    id: '3',
    title: 'Cloud Security Best Practices for Enterprise Applications',
    type: 'blog-post',
    status: 'draft',
    author: 'James Park',
    publishDate: null,
    views: 0,
    likes: 0,
    comments: 0,
    category: 'Cybersecurity',
    featured: false,
  },
  {
    id: '4',
    title: 'Services Overview',
    type: 'page',
    status: 'published',
    author: 'Marketing Team',
    publishDate: '2024-01-08',
    views: 15678,
    likes: 423,
    comments: 45,
    category: 'Services',
    featured: false,
  },
  {
    id: '5',
    title: 'Case Study: Financial Services Transformation',
    type: 'case-study',
    status: 'published',
    author: 'Case Study Team',
    publishDate: '2024-01-12',
    views: 7892,
    likes: 198,
    comments: 15,
    category: 'Case Studies',
    featured: true,
  },
];

const mediaAssets = [
  {
    id: '1',
    name: 'hero-background.jpg',
    type: 'image',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadDate: '2024-01-10',
    usedIn: ['Homepage', 'About Page'],
  },
  {
    id: '2',
    name: 'ai-transformation-blog.mp4',
    type: 'video',
    size: '45.2 MB',
    duration: '3:24',
    uploadDate: '2024-01-15',
    usedIn: ['AI Blog Post'],
  },
  {
    id: '3',
    name: 'company-logo.svg',
    type: 'image',
    size: '12.5 KB',
    dimensions: 'SVG',
    uploadDate: '2023-12-01',
    usedIn: ['All Pages', 'Footer'],
  },
];

const contentStats = {
  totalContent: contentItems.length,
  published: contentItems.filter(item => item.status === 'published').length,
  drafts: contentItems.filter(item => item.status === 'draft').length,
  totalViews: contentItems.reduce((sum, item) => sum + item.views, 0),
  totalEngagement: contentItems.reduce((sum, item) => sum + item.likes + item.comments, 0),
};

function ContentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage website content, blog posts, and media assets</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <File className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Content</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contentStats.totalContent}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contentStats.published}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contentStats.drafts}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Edit className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contentStats.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{contentStats.totalEngagement}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Tabs */}
      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search content..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Bulk Edit</Button>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {item.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                            <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {item.type.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          item.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {item.author}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {item.views.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {item.publishDate ? new Date(item.publishDate).toLocaleDateString() : 'Draft'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Globe className="h-4 w-4 mr-2" />
                              {item.status === 'published' ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Media Library</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage images, videos, and other media assets</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaAssets.map((asset) => (
                  <Card key={asset.id} className="overflow-hidden">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {asset.type === 'image' && (
                        <span title={asset.name} role="img" aria-label={asset.name}>
                          <Image className="h-12 w-12 text-gray-400" aria-hidden="true" alt="" />
                        </span>
                      )}
                      {asset.type === 'video' && <Video className="h-12 w-12 text-gray-400" aria-hidden="true" />}
                      {asset.type === 'file' && <File className="h-12 w-12 text-gray-400" aria-hidden="true" />}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-1 truncate">{asset.name}</h4>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <p>Size: {asset.size}</p>
                        {asset.dimensions && <p>Dimensions: {asset.dimensions}</p>}
                        {asset.duration && <p>Duration: {asset.duration}</p>}
                        <p>Uploaded: {new Date(asset.uploadDate).toLocaleDateString()}</p>
                        <p>Used in: {asset.usedIn.join(', ')}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pages Indexed</span>
                    <Badge variant="secondary">1,247</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organic Traffic</span>
                    <Badge variant="secondary">+23.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Position</span>
                    <Badge variant="secondary">12.3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Core Web Vitals</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">95+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Pages with Meta Descriptions</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Pages with Alt Tags</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Schema Markup</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ContentPage() {
  return (
    <AdminLayout>
      <ContentDashboard />
    </AdminLayout>
  );
}

