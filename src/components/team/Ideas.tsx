import React, { useState } from "react";
import { Ideas as IdeasType, Idea, Question } from "./types";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IdeaCard } from "./IdeaCard";
import { IdeaQuestions } from "./IdeaQuestions";
import { YouTubeThumbnail } from "./YouTubeThumbnail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  LightbulbIcon,
  ListChecks,
  Send,
  Plus,
  PlayCircle,
  PencilLine,
  CheckCircle2,
  Trophy,
  ChevronDown,
  ChevronRight,
  FileEdit,
  Layers,
  X,
} from "lucide-react";

interface IdeasProps {
  ideas: IdeasType;
  getFullImageUrl: (path: string) => string;
  onIdeaChange: (
    sectionId: "review_idea" | "select_idea" | "submit_idea",
    field: keyof Idea,
    value: string
  ) => void;
  onQuestionChange: (
    sectionId: "review_idea" | "select_idea",
    questionIndex: number,
    field: keyof Question,
    value: unknown
  ) => void;
  onQuestionAdd: (sectionId: "review_idea" | "select_idea") => void;
  onQuestionRemove: (
    sectionId: "review_idea" | "select_idea",
    questionIndex: number
  ) => void;
  onYouTubeThumbnailChange: (value: string) => void;
  onMenuListChange: (
    field: keyof IdeasType["menu_list"],
    value: string
  ) => void;
  onPlayIdeaAdd: () => void;
  onPlayIdeaChange: (index: number, value: string) => void;
  onPlayIdeaRemove: (index: number) => void;
}

export const Ideas = ({
  ideas,
  getFullImageUrl,
  onIdeaChange,
  onQuestionChange,
  onQuestionAdd,
  onQuestionRemove,
  onYouTubeThumbnailChange,
  onMenuListChange,
  onPlayIdeaAdd,
  onPlayIdeaChange,
  onPlayIdeaRemove,
}: IdeasProps) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    reviewDetails: true,
    reviewQuestions: false,
    selectDetails: true,
    selectPlayIdeas: false,
    selectQuestions: false,
    submitDetails: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const ideaCards = [
    {
      id: "review_idea",
      title: ideas.menu_list.review_title,
      description: ideas.menu_list.review_description,
      count: ideas.review_idea?.questions?.length ?? 0,
      onTitleChange: (value: string) => onMenuListChange("review_title", value),
      onDescriptionChange: (value: string) =>
        onMenuListChange("review_description", value),
      icon: <ListChecks className="w-5 h-5 text-primary" />,
    },
    {
      id: "select_idea",
      title: ideas.menu_list.select_title,
      description: ideas.menu_list.select_description,
      count: ideas.select_idea?.questions?.length ?? 0,
      onTitleChange: (value: string) => onMenuListChange("select_title", value),
      onDescriptionChange: (value: string) =>
        onMenuListChange("select_description", value),
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
    },
    {
      id: "submit_idea",
      title: ideas.menu_list.submit_title,
      description: ideas.menu_list.submit_description,
      onTitleChange: (value: string) => onMenuListChange("submit_title", value),
      onDescriptionChange: (value: string) =>
        onMenuListChange("submit_description", value),
      icon: <Send className="w-5 h-5 text-primary" />,
    },
  ];

  const tabs = [
    {
      id: "review_idea",
      title: "Review Idea",
      icon: <ListChecks className="w-5 h-5" />,
    },
    {
      id: "select_idea",
      title: "Select Idea",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      id: "submit_idea",
      title: "Submit Idea",
      icon: <Send className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with improved design */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Ideas</h2>
          </div>
        </div>

        {/* YouTube Thumbnail Section */}
        <div className="mb-4">
          <YouTubeThumbnail
            imagePath={ideas.default_youtube_thumbnail_image}
            onChange={onYouTubeThumbnailChange}
            getFullImageUrl={getFullImageUrl}
          />
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {ideaCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gray-100 text-primary">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <Input
                      value={card.title}
                      onChange={(e) => card.onTitleChange(e.target.value)}
                      placeholder="Enter title"
                      className="text-lg font-semibold bg-white border-0 px-0 h-auto focus:ring-2 focus:ring-primary focus:border-primary p-0 placeholder:text-gray-400 text-gray-900"
                    />
                  </div>
                </div>
                <Textarea
                  value={card.description}
                  onChange={(e) => card.onDescriptionChange(e.target.value)}
                  placeholder="Enter description"
                  className="min-h-[80px] bg-white text-gray-600 border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                />
                {card.count !== undefined && (
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 w-fit">
                    <PencilLine className="w-4 h-4" />
                    {card.count} Questions
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabbed Content with Collapsible Sections */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <Tabs defaultValue="review_idea">
          <TabsList className="flex p-0 bg-white border-b border-gray-200">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex-1 py-4 px-5 rounded-none text-sm font-medium text-gray-600 
                border-b-2 border-transparent 
                hover:bg-gray-50 hover:text-gray-900
                data-[state=active]:text-primary 
                data-[state=active]:border-primary 
                data-[state=active]:bg-gray-50/80
                transition-all duration-200"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="transition-transform duration-200 data-[state=active]:scale-110">
                    {tab.icon}
                  </span>
                  <span>{tab.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="p-4">
            <TabsContent value="review_idea" className="mt-0 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300">
              <div className="py-2">
                <div className="space-y-4">
                  {/* Collapsible Details Section */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("reviewDetails")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <FileEdit className="w-4 h-4 text-primary" />
                        <span className="font-medium">Details</span>
                      </div>
                      {expandedSections.reviewDetails ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.reviewDetails && (
                      <div className="p-4 border-t border-gray-200">
                        <IdeaCard
                          idea={
                            ideas.review_idea || {
                              id: "",
                              title: "",
                              description: "",
                              image: "",
                              completion_msg: "",
                              completion_image: "",
                              questions: [],
                            }
                          }
                          index={0}
                          getFullImageUrl={getFullImageUrl}
                          onIdeaChange={(_, field, value) =>
                            onIdeaChange("review_idea", field, value)
                          }
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Collapsible Questions Section */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("reviewQuestions")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        <span className="font-medium">Questions</span>
                        <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                          {ideas.review_idea?.questions?.length || 0}
                        </span>
                      </div>
                      {expandedSections.reviewQuestions ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.reviewQuestions && (
                      <div className="p-4 border-t border-gray-200">
                        <IdeaQuestions
                          questions={ideas.review_idea?.questions || []}
                          onQuestionChange={(questionIndex, field, value) =>
                            onQuestionChange(
                              "review_idea",
                              questionIndex,
                              field,
                              value
                            )
                          }
                          onQuestionAdd={() => onQuestionAdd("review_idea")}
                          onQuestionRemove={(questionIndex) =>
                            onQuestionRemove("review_idea", questionIndex)
                          }
                          sectionTitle="Review Questions"
                          getFullImageUrl={getFullImageUrl}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="select_idea" className="mt-0 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300">
              <div className="py-2">
                <div className="space-y-4">
                  {/* Collapsible Details Section */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("selectDetails")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <FileEdit className="w-4 h-4 text-primary" />
                        <span className="font-medium">Details</span>
                      </div>
                      {expandedSections.selectDetails ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.selectDetails && (
                      <div className="p-4 border-t border-gray-200">
                        <IdeaCard
                          idea={
                            ideas.select_idea || {
                              id: "",
                              title: "",
                              description: "",
                              image: "",
                              completion_msg: "",
                              completion_image: "",
                              questions: [],
                            }
                          }
                          index={1}
                          getFullImageUrl={getFullImageUrl}
                          onIdeaChange={(_, field, value) =>
                            onIdeaChange("select_idea", field, value)
                          }
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Collapsible Play Ideas Section */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("selectPlayIdeas")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-primary" />
                        <span className="font-medium">Play Ideas</span>
                        <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                          {ideas.play_ideas?.length || 0}
                        </span>
                      </div>
                      {expandedSections.selectPlayIdeas ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.selectPlayIdeas && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-700">Play Ideas List</h3>
                          <Button
                            onClick={onPlayIdeaAdd}
                            variant="outline"
                            size="sm"
                            className="h-8 bg-white"
                          >
                            <Plus className="w-4 h-4 mr-1.5" />
                            Add Play Idea
                          </Button>
                        </div>
                        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(ideas.play_ideas || []).map((idea, index) => (
                            <div 
                              key={index} 
                              className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
                            >
                              <div className="flex-1 flex items-center gap-2">
                                <LightbulbIcon className="w-4 h-4 text-amber-500" />
                                <Input
                                  value={idea}
                                  onChange={(e) => onPlayIdeaChange(index, e.target.value)}
                                  placeholder="Enter play idea"
                                  className="flex-1 h-9 bg-white text-gray-900 border-0 focus:ring-0 focus:border-0 px-0"
                                />
                              </div>
                              <Button
                                onClick={() => onPlayIdeaRemove(index)}
                                variant="ghost"
                                size="sm"
                                className="h-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          
                          {(ideas.play_ideas || []).length === 0 && (
                            <div className="col-span-2 p-6 text-center border border-dashed border-gray-200 rounded-lg">
                              <LightbulbIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm text-gray-500 mb-3">
                                No play ideas added yet.
                              </p>
                              <Button 
                                onClick={onPlayIdeaAdd}
                                variant="outline" 
                                size="sm"
                              >
                                <Plus className="w-4 h-4 mr-1.5" />
                                Add First Play Idea
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Collapsible Questions Section */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("selectQuestions")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        <span className="font-medium">Questions</span>
                        <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                          {ideas.select_idea?.questions?.length || 0}
                        </span>
                      </div>
                      {expandedSections.selectQuestions ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.selectQuestions && (
                      <div className="p-4 border-t border-gray-200">
                        <IdeaQuestions
                          questions={ideas.select_idea?.questions || []}
                          onQuestionChange={(questionIndex, field, value) =>
                            onQuestionChange(
                              "select_idea",
                              questionIndex,
                              field,
                              value
                            )
                          }
                          onQuestionAdd={() => onQuestionAdd("select_idea")}
                          onQuestionRemove={(questionIndex) =>
                            onQuestionRemove("select_idea", questionIndex)
                          }
                          sectionTitle="Selection Questions"
                          getFullImageUrl={getFullImageUrl}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="submit_idea" className="mt-0 animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:duration-300">
              <div className="py-2">
                <div className="space-y-4">
                  {/* Collapsible Details Section */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSection("submitDetails")}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <FileEdit className="w-4 h-4 text-primary" />
                        <span className="font-medium">Details</span>
                      </div>
                      {expandedSections.submitDetails ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedSections.submitDetails && (
                      <div className="p-4 border-t border-gray-200">
                        <IdeaCard
                          idea={
                            ideas.submit_idea || {
                              id: "",
                              title: "",
                              description: "",
                              image: "",
                              completion_msg: "",
                              completion_image: "",
                              questions: [],
                            }
                          }
                          index={2}
                          getFullImageUrl={getFullImageUrl}
                          onIdeaChange={(_, field, value) =>
                            onIdeaChange("submit_idea", field, value)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
