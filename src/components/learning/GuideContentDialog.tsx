import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GuideContentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  guide: {
    title: string;
    content?: string;
  };
}

const GuideContentDialog = ({ isOpen, onClose, guide }: GuideContentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800">{guide.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="prose prose-green max-w-none">
            {guide.content || (
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <p className="text-lg font-semibold text-green-800 mb-4">
                    Welcome to our comprehensive guide on sustainable farming practices in Botswana. This guide will help you understand and implement effective agricultural methods that are both environmentally friendly and economically viable.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Introduction to Sustainable Farming</h2>
                  <p className="mb-4">
                    Sustainable farming practices are agricultural methods that protect the environment, public health, human communities, and animal welfare. These practices are particularly important in Botswana's unique climate and ecosystem, where water conservation and soil management are crucial for successful farming.
                  </p>
                  <p className="mb-4">
                    By implementing sustainable farming techniques, farmers can create a more resilient agricultural system that not only produces high-quality crops but also preserves natural resources for future generations. This approach combines traditional farming wisdom with modern agricultural science to achieve optimal results.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Key Principles of Sustainable Farming</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-green-700 mb-2">Soil Conservation</h3>
                      <p>
                        Maintaining healthy soil is fundamental to sustainable farming. This involves practices such as crop rotation, minimal tillage, and the use of cover crops. These methods help prevent soil erosion, maintain soil structure, and enhance natural fertility. In Botswana's climate, protecting topsoil is especially crucial for long-term agricultural success.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-700 mb-2">Water Management</h3>
                      <p>
                        Efficient water use is critical in Botswana's semi-arid climate. Sustainable irrigation methods, water harvesting techniques, and drought-resistant crop selection help maximize water efficiency. Modern technologies like drip irrigation can significantly reduce water consumption while maintaining optimal crop growth.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Integrated Pest Management (IPM)</h2>
                  <p className="mb-4">
                    IPM is a sustainable approach to managing pests, diseases, and weeds that combines biological, cultural, physical, and chemical tools in a way that minimizes economic, health, and environmental risks. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Biological control using natural predators</li>
                    <li>Cultural practices that reduce pest establishment</li>
                    <li>Physical and mechanical controls</li>
                    <li>Chemical controls as a last resort</li>
                  </ul>
                  <p>
                    By implementing IPM, farmers can effectively manage pests while protecting beneficial insects and reducing reliance on chemical pesticides.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Crop Diversification and Rotation</h2>
                  <p className="mb-4">
                    Diversifying crops and implementing rotation systems offers numerous benefits for sustainable farming:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-bold text-green-700 mb-2">Benefits of Diversification</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Reduced risk of total crop failure</li>
                        <li>Better pest and disease management</li>
                        <li>Improved soil health</li>
                        <li>Enhanced biodiversity</li>
                        <li>Increased income stability</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-bold text-green-700 mb-2">Rotation Strategies</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Alternate between deep and shallow-rooted crops</li>
                        <li>Include nitrogen-fixing legumes</li>
                        <li>Consider market demand in rotation planning</li>
                        <li>Maintain soil coverage year-round</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Climate-Smart Agriculture</h2>
                  <p className="mb-4">
                    Climate-smart agriculture (CSA) is particularly relevant in Botswana's changing climate. This approach focuses on:
                  </p>
                  <div className="space-y-4">
                    <p>
                      <span className="font-bold text-green-700">Adaptation:</span> Adjusting farming practices to new climate patterns and extreme weather events through improved varieties, modified planting dates, and diversified farming systems.
                    </p>
                    <p>
                      <span className="font-bold text-green-700">Mitigation:</span> Reducing greenhouse gas emissions from farming activities through improved soil and livestock management, efficient use of inputs, and renewable energy adoption.
                    </p>
                    <p>
                      <span className="font-bold text-green-700">Resilience:</span> Building farming systems that can recover from climate shocks and maintain productivity through diversification, improved soil health, and water management.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Implementation and Best Practices</h2>
                  <div className="space-y-4">
                    <p>
                      Implementing sustainable farming practices requires careful planning and a systematic approach. Here are key steps for successful implementation:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>Assess your current farming system and identify areas for improvement</li>
                      <li>Start with small changes and gradually expand sustainable practices</li>
                      <li>Monitor results and adjust methods based on outcomes</li>
                      <li>Join farmer networks to share experiences and learn from others</li>
                      <li>Keep detailed records to track progress and identify successful strategies</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold text-green-800 mb-4">Conclusion</h2>
                  <p className="mb-4">
                    Sustainable farming is not just an environmental choice; it's a practical approach to ensuring long-term agricultural success in Botswana. By implementing these practices, farmers can:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Improve soil health and productivity</li>
                    <li>Reduce input costs and increase profitability</li>
                    <li>Build resilience to climate change</li>
                    <li>Protect natural resources for future generations</li>
                    <li>Create more stable and sustainable farm businesses</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GuideContentDialog;