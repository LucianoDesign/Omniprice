import Faq from "@/components/Faq";

const Help = () => {
  return (
    <>
      <section className="px-6 md:px-20 pb-12 pt-12">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="head-text">
              Frequently Asked
              <span className="text-primary"> Questions</span>
            </h1>
            <h2 className="mt-6 section-text">Common Questions, Clear Answers</h2>
          </div>
        </div>
      </section>
      <section className="px-6 md:px-20 pb-12">
        <Faq />
      </section>
    </>
  );
};

export default Help;
