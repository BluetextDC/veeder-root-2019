<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/veeder/templates/parts/contact-footer.html.twig */
class __TwigTemplate_92752f0e1d21a88754b531f6ff7606c8cd75191a0ef4aacde521d4cc1987ad6e extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 9];
        $filters = ["render" => 9, "escape" => 13];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                ['render', 'escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 9
        if ((($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_display_contact_footer", []), 0, []), "#markup", [], "array") == 1) &&  !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_contact_footer_form", []))))) {
            // line 10
            echo "  <section class=\"contact-sec bg-gray space-large\">
    <div class=\"small-container\">
      <div class=\"heading-txt text-center\">
        <h2>";
            // line 13
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_contact_footer_form", []), 0, []), "#markup", [], "array")), "html", null, true);
            echo "</h2>
      </div>
      <div role=\"form\" >
        ";
            // line 16
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_contact_footer_form", []), 0, []), "value", []) == "contact-us")) {
                // line 17
                echo "          <!--[if lte IE 8]>
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"></script>
          <![endif]-->
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"></script>
          <script>
            hbspt.forms.create({
            portalId: \"5361935\",
            formId: \"e7925078-ecc3-4fc0-a7d2-0e0d3a76a9f1\"
          });
          </script>
        ";
            }
            // line 28
            echo "        
        ";
            // line 29
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_contact_footer_form", []), 0, []), "value", []) == "request-for-quote")) {
                // line 30
                echo "          <!--[if lte IE 8]>
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"></script>
          <![endif]-->
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"></script>
          <script>
            hbspt.forms.create({
            portalId: \"5361935\",
            formId: \"edf2530b-2f2c-46fc-bb56-7163e94dd003\"
          });
          </script>
        ";
            }
            // line 41
            echo "        
        ";
            // line 42
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_contact_footer_form", []), 0, []), "value", []) == "technical-support-request")) {
                // line 43
                echo "          <!--[if lte IE 8]>
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"></script>
          <![endif]-->
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"></script>
          <script>
            hbspt.forms.create({
            portalId: \"5361935\",
            formId: \"41acc59a-ac51-4783-a50b-c54b2e879788\"
          });
          </script>
        ";
            }
            // line 54
            echo "        
        ";
            // line 55
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_contact_footer_form", []), 0, []), "value", []) == "customer-support-request")) {
                // line 56
                echo "          <!--[if lte IE 8]>
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2-legacy.js\"></script>
          <![endif]-->
          <script charset=\"utf-8\" type=\"text/javascript\" src=\"//js.hsforms.net/forms/v2.js\"></script>
          <script>
            hbspt.forms.create({
            portalId: \"5361935\",
            formId: \"d7898a7c-464b-492d-b644-c4d94503cd47\"
          });
          </script>
        ";
            }
            // line 67
            echo "      </div>
    </div>
  </section>
";
        }
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/parts/contact-footer.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  137 => 67,  124 => 56,  122 => 55,  119 => 54,  106 => 43,  104 => 42,  101 => 41,  88 => 30,  86 => 29,  83 => 28,  70 => 17,  68 => 16,  62 => 13,  57 => 10,  55 => 9,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/parts/contact-footer.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\parts\\contact-footer.html.twig");
    }
}
