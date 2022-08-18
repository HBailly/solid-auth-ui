<template>
  <div>
    <h3 ref="title" class="display-7" style="margin-bottom: 35px">Plain Language Statement</h3>
    <h5 class="display-8" style="margin-bottom: 0">A Dublin City University M.Sc. in Computing research project</h5>

    <table class="table table-sm table-borderless" style="width: auto">
      <tbody>
        <tr>
          <th scope="row">Investigators</th>
          <td class="pl-3" style="white-space: nowrap">Hadrien BAILLY</td>
          <td class="pl-3" style="white-space: nowrap">Anoop PAPANNA</td>
        </tr>
        <tr>
          <th scope="row">Supervisor</th>
          <td class="pl-3" style="white-space: nowrap">Rob BRENNAN</td>
          <td />
        </tr>
      </tbody>
    </table>

    <div style="text-align: justify">
      <p>
        You have been invited to take part in a research study on a user interface (UI) prototype for access & usage control based on the
        <em><a href="https://solid.github.io/data-interoperability-panel/specification/">Data Interoperability Panel specification</a></em
        >, and privacy preferences expression in the SOLID environment.
      </p>
      <p>
        Before you decide, please take time to read the following information carefully. Talk to others about the study if you wish. Feel
        free to ask the investigators if there is anything that is not clear or if you would like more information.
      </p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Purpose</h5>
      <p>
        The purpose of this study is to measure the effectiveness of a user interface design. Open linked data environments such as Solid
        empower users to an unmatched level of personalization. However, it is not clear whether these new configuration responsibilities
        benefit or befall the users.
      </p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Voluntary Participation</h5>
      <p>
        Your participation in the study is <em class="text-muted">completely voluntary</em>, and you may choose to stop participation at any
        time, for any reason. Your decision not to volunteer, to stop participating or to refuse to answer particular questions will not
        influence the nature of your relationship with the researchers, or Dublin City University, either now or in the future.
      </p>
      <p>In the event you withdraw from the study, all associated data collected will be immediately destroyed wherever possible.</p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Contents</h5>
      <p>If you agree to participate, you will be involved in an unattended survey session.</p>
      <p style="margin: 0; padding-top: 0">The survey will consist of the following:</p>
      <ol style="list-style-type: square">
        <li class="font-italic">
          a questionnaire with closed questions regarding some of your user characteristics, your experience with SOLID, GDPR consent and
          privacy preferences, technology and app permissions, and your privacy disposition.
        </li>
        <li class="font-italic">three directed tasks with pre-determined scenarios, using the user interface prototype.</li>
        <li class="font-italic">
          a questionnaire with open and closed questions about the tasks realized, your satisfaction with the interface and its performance.
        </li>
      </ol>
      <p>
        Your data will be used to evaluate the usability of the user interface design, and determine if this interface, and its underlying
        specification, provide enough expressiveness for the users to generate appropriate permissions.
      </p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Confidentiality</h5>
      <p>
        All information you supply during this research will be held in confidence, and your name will not appear in any report or
        publication of the research. The aggregated and anonymized results may be used for academic publications.
      </p>
      <p>
        Your data will be safely stored in a secured environment, and only research staff will have access to this information in the
        context of the research. Your data will be kept until after the Progression and Awards Board for the current academic year, or
        December 2022 (whichever is the earliest). After this date, data will be removed from storage and permanently destroyed by the
        investigators.
      </p>
      <p>Confidentiality will be provided to the fullest extent possible by law.</p>
      <p>For any question regarding your personal data, please feel free to contact the DCU Data Protection Officer (DPO):</p>
      <div style="width: fit-content; margin-left: auto; margin-right: auto">
        <person-component :person="WARD" />
      </div>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Risks and Discomforts</h5>
      <p>We do not foresee any risk or discomfort from your participation in the research.</p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Benefits</h5>
      <p>This research does not involve direct or indirect benefits to its participants.</p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Complaints</h5>
      <p>
        Any complaint about the way you have been dealt with during the study or any possible harm that you may have suffered can be
        addressed by contacting our supervisor directly using the contact details at the end of this document.
      </p>
      <p>
        You also have an inalienable right to file a complaint with the Irish Data Protection Commission. <br />
        Contact Form: <a href="https://forms.dataprotection.ie/contact">https://forms.dataprotection.ie/contact</a>.
      </p>
    </div>

    <div style="text-align: justify">
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Ethics</h5>
      <p>
        This research has been reviewed and approved by Dublin City University Research Ethics Committee (DCU REC) and conforms to the
        standards of SATORI Ethics Assessment Frameworks. Moreover, it operates in accordance to national, international and EU legislation,
        and with the DCU Code of Good Research Practice.
      </p>
      <p>
        For more information, please consult the REC home page at
        <a href="https://www.dcu.ie/researchsupport/research-ethics">https://www.dcu.ie/researchsupport/research-ethics.</a>
      </p>
      <p>
        If you have any question with this process, or about your rights as a participant in the study, please contact the Research Ethics
        Committee secretary:
      </p>
      <div style="width: fit-content; margin-left: auto; margin-right: auto">
        <person-component :person="SECRETARY" />
      </div>
      <br />
    </div>

    <div>
      <h5 style="margin: 0; padding-top: 0; font-weight: bold">Contact</h5>
      <contact-component :standalone="false" />
    </div>
    <div>
      <b-button a block class="mr-auto ml-auto" style="margin-top: 5px; width: 50%; height: 50px" variant="info" @click="next()"
        >Participate in the survey
      </b-button>
    </div>
  </div>
</template>

<script lang="ts" src="./pls.component.ts"></script>
